import { NextResponse } from "next/server";

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');

    if (!searchText) {
        return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=6`;

    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Taxi Booking/1.0 (ssangarapu@gmail.com)"
            }
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from Nomination' }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
