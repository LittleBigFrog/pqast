import { Parse } from "@microsoft/powerquery-parser";

export default {
    async fetch(request: Request): Promise<Response> {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Use POST method" }), { status: 405 });
        }

        try {
            const { query } = await request.json();
            if (!query) {
                return new Response(JSON.stringify({ error: "Missing Power Query code" }), { status: 400 });
            }

            const ast = Parse(query);
            return new Response(JSON.stringify(ast, null, 2), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: "Failed to parse query", details: error.toString() }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },
};
