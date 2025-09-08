// Netlify function variant of puter-token.
// Configure environment variables in Netlify UI: PUTER_EMAIL, PUTER_PASSWORD.

export async function handler() {
  if (!process.env.Puter_EMAIL || !process.env.PUTER_PASSWORD) {
    return {
      statusCode: 200,
      body: JSON.stringify({ token: null, note: 'Puter credentials not configured' })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ token: null, note: 'Server-side Puter login not yet implemented' })
  };
}
