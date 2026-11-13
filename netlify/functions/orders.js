// Netlify Function: dukaandaar dashboard ke liye orders laata hai (password-protected)
exports.handler = async (event) => {
  const { DASH_PASSWORD, NETLIFY_TOKEN, SITE_ID } = process.env;
  const json = (code, body) => ({
    statusCode: code,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify(body),
  });
  if (!DASH_PASSWORD || !NETLIFY_TOKEN || !SITE_ID) return json(500, { error: "env vars set nahi hain" });
  if ((event.headers["x-dash-pass"] || "") !== DASH_PASSWORD) return json(401, { error: "unauthorized" });
  try {
    const r = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions?per_page=100`, {
      headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` },
    });
    if (!r.ok) return json(502, { error: "netlify api error" });
    const list = await r.json();
    const orders = list
      .filter((s) => s.form_name === "order")
      .map((s) => ({ id: s.id, ts: Date.parse(s.created_at), data: s.data }));
    return json(200, { orders });
  } catch (e) {
    return json(500, { error: "server error" });
  }
};
