import { NextResponse } from 'next/server';

const API_BASE = 'https://garas-api.itedev.online';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const { searchParams } = new URL(req.url);
        const pathStr = Array.isArray(path) ? path.join('/') : path;
        const queryString = searchParams.toString();
        const url = `${API_BASE}/${pathStr}${queryString ? '?' + queryString : ''}`;

        console.log('Proxy request details:', {
            path: pathStr,
            queryString,
            fullUrl: url,
            searchParams: Object.fromEntries(searchParams),
        });

        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        const data = await res.json();
        console.log('Proxy response status:', res.status, 'for URL:', url);
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Proxy fetch failed:', error);
        return NextResponse.json(
            { message: 'Proxy fetch failed', error: String(error) },
            { status: 500 }
        );
    }
}
