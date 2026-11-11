// Free Cloudflare Worker: lets Share Signals read YOUR holdings from Zerodha Kite.
// Secrets (never put them in the app): KITE_API_KEY, KITE_ACCESS_TOKEN (Kite tokens expire daily).
// Deploy: dash.cloudflare.com > Workers > Create > paste this > Settings > Variables (add the two secrets).
// Using Upstox/Angel/IBKR? Change the URL, headers and field names below; the app expects [{symbol,exchange,qty,avg}].
export default {
  async fetch(req, env) {
    const cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
    if (new URL(req.url).pathname !== '/holdings') return new Response('[]', {headers: cors});
    const r = await fetch('https://api.kite.trade/portfolio/holdings', {
      headers: {'X-Kite-Version': '3', Authorization: `token ${env.KITE_API_KEY}:${env.KITE_ACCESS_TOKEN}`}});
    const j = await r.json();
    const out = (j.data || []).map(h => ({symbol: h.tradingsymbol, exchange: h.exchange, qty: h.quantity, avg: h.average_price}));
    return new Response(JSON.stringify(out), {headers: cors});
  }
};
