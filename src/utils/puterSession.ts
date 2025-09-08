// Silent session management for Puter.js
// This avoids embedding credentials in the bundle; instead we fetch a short-lived token
// from a backend function that reads secure env vars.

const TOKEN_ENDPOINTS = [
    '/api/puter-token',              // Vercel style
    '/.netlify/functions/puter-token' // Netlify style
];

const LS_KEY = 'puter.session.token';
let inflight: Promise<string | null> | null = null;

export async function fetchBackendToken(): Promise<string | null> {
    if (inflight) return inflight;
    inflight = (async () => {
        for (const url of TOKEN_ENDPOINTS) {
            try {
                const res = await fetch(url, { method: 'GET' });
                if (!res.ok) continue;
                const data = await res.json().catch(() => null) as { token?: string } | null;
                if (data?.token) return data.token;
            } catch {/* try next */ }
        }
        return null;
    })();
    const t = await inflight;
    inflight = null;
    return t;
}

export async function restorePuterSession(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.puter) return false;
    const auth = window.puter.auth;
    try {
        // If already has a user, nothing to do
        if (auth?.getUser) {
            const user = await Promise.race([
                auth.getUser(),
                new Promise(res => setTimeout(res, 400))
            ]);
            if (user) return true;
        }
    } catch {/* proceed to token restore */ }

    // Try stored token
    try {
        const stored = localStorage.getItem(LS_KEY);
        if (stored && auth?.useToken) {
            await auth.useToken(stored);
            return true;
        }
    } catch {/* ignore */ }

    // Fetch backend token
    try {
        const token = await fetchBackendToken();
        if (token && auth?.useToken) {
            await auth.useToken(token);
            try { localStorage.setItem(LS_KEY, token); } catch {/* ignore */ }
            return true;
        }
    } catch {/* ignore */ }
    return false;
}

export async function clearPuterSession() {
    try { localStorage.removeItem(LS_KEY); } catch {/* ignore */ }
    if (window.puter?.auth?.logout) {
        try { await window.puter.auth.logout(); } catch {/* ignore */ }
    }
}
