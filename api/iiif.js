const IIIF_UPSTREAM_BASE = 'https://www.artic.edu/iiif/2';

export async function GET(request) {
  const incomingUrl = new URL(request.url);
  const rawPath = incomingUrl.searchParams.get('__path') || '';
  const pathSegment = rawPath.replace(/^\/+/, '');
  const targetUrl = new URL(`${IIIF_UPSTREAM_BASE}/${pathSegment}`);

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
        Accept: 'image/*,*/*;q=0.8',
      },
    });

    const buffer = await upstream.arrayBuffer();
    const headers = new Headers({
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
    });

    if (upstream.ok) {
      headers.set(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=604800'
      );
    }

    return new Response(buffer, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to reach Art Institute of Chicago IIIF service',
        detail: error?.message || 'Upstream image error',
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
