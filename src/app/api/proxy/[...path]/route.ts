import { NextResponse } from 'next/server';

const API_BASE = 'https://garas-api.domrey.online';

async function handleRequest(
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
            method: req.method,
            path: pathStr,
            queryString,
            fullUrl: url,
            searchParams: Object.fromEntries(searchParams),
        });

        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        };

        // Forward content-type if present
        const contentType = req.headers.get('content-type');
        if (contentType) {
            headers['Content-Type'] = contentType;
        }

        const fetchOptions: RequestInit = {
            method: req.method,
            headers,
        };

        // Include body for non-GET/HEAD requests
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            const body = await req.text();
            if (body) {
                fetchOptions.body = body;
            }
        }

        const res = await fetch(url, fetchOptions);

        // Check if response is JSON
        const contentTypeHeader = res.headers.get('content-type');
        if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
            const data = await res.json();
            console.log('Proxy response status:', res.status, 'for URL:', url);
            return NextResponse.json(data, { status: res.status });
        } else {
            // Handle non-JSON responses
            const text = await res.text();
            console.error('Proxy received non-JSON response:', text.substring(0, 200));
            return NextResponse.json(
                { message: 'Proxy received non-JSON response', error: text.substring(0, 500) },
                { status: res.status }
            );
        }
    } catch (error) {
        console.error('Proxy fetch failed:', error);
        return NextResponse.json(
            { message: 'Proxy fetch failed', error: String(error) },
            { status: 500 }
        );
    }
}

export async function GET(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(req, context);
}

export async function POST(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(req, context);
}

export async function PUT(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(req, context);
}

export async function DELETE(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(req, context);
}

export async function PATCH(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(req, context);
}
