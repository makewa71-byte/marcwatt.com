export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (url.pathname === "/health" && request.method === "GET") {
      return new Response(JSON.stringify({
        ok: true,
        service: "marc-watt-neural-lab-api",
        message: "API gateway online. No GPU inference provider connected yet."
      }), { headers: cors });
    }
    if (url.pathname === "/jobs" && request.method === "POST") {
      // TODO: authenticate the user, validate the payload, store the job,
      // and dispatch it to a GPU inference service. Never expose GPU/API secrets
      // in the browser.
      return new Response(JSON.stringify({
        ok: false,
        error: "Inference provider not configured",
        next: "Connect an authenticated GPU inference service."
      }), { status: 501, headers: cors });
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: cors });
  }
};