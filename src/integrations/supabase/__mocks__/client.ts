// Minimal supabase mock for tests
type Session = null; // minimal placeholder
type AuthChangeCallback = (event: string, session: Session) => void;

export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: null as Session } }),
        onAuthStateChange: (_cb: AuthChangeCallback) => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signOut: async () => ({ error: null })
    },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: { code: 'PGRST116' } }) }) }) })
};
