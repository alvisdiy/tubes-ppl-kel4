const AIC_BASE_URL = 'https://api.artic.edu/api/v1';

export async function GET(request) {
  const incomingUrl = new URL(request.url);
  const rawPath = incomingUrl.searchParams.get('__path') || '';
  const pathSegment = rawPath.replace(/^\/+/, '');
  const targetUrl = new URL(`${AIC_BASE_URL}/${pathSegment}`);

  incomingUrl.searchParams.forEach((value, key) => {
    if (key !== '__path') {
      targetUrl.searchParams.append(key, value);
    }
  });

  const userAgent =
    process.env.AIC_USER_AGENT ||
    process.env.VITE_AIC_USER_AGENT ||
    'ARTORA (artora@example.com)';

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'AIC-User-Agent': userAgent,
        Accept: 'application/json',
      },
    });

    const body = await upstream.text();
    const headers = new Headers({
      'Content-Type':
        upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    });

    if (upstream.ok) {
      headers.set(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=600'
      );
    }

    return new Response(body, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to reach Art Institute of Chicago API',
        detail: error?.message || 'Upstream request error',
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  }
}
