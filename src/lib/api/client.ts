const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchAPI(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    // Log the outgoing request for easier debugging during development
    // (This will appear in the server console when ran from Next.js server-side,
    //  and in the browser console when ran client-side.)
    console.log('fetchAPI request:', { url });

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      let bodyText = '';
      try {
        bodyText = await res.text();
      } catch (e) {
        bodyText = '<unable to read body>';
      }

      throw new Error(
        `Request failed with status ${res.status} ${res.statusText} for ${url}: ${bodyText}`
      );
    }

    return res.json();
  } catch (err: any) {
    // Network or other fetch error
    console.error('fetchAPI error:', err);
    throw new Error(`Network error while fetching ${url}: ${err?.message || err}`);
  }
}

console.log("BASE_URL:", BASE_URL);