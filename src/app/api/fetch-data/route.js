// /app/api/fetch-data/route.js

export async function POST(request) {
    const { query } = await request.json();

    const apiUrl = "https://server.leakosint.com/";
    const body = JSON.stringify({
        token: "1102217972:dt2PYzuo",
        request: query,
        limit: 1000,
        lang: "ID"
    });

    const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    });

    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), {
        status: apiResponse.status,
        headers: { "Content-Type": "application/json" },
    });
}
