// Free Cloudflare Worker for Share Signals. Routes: /chart (prices), /news (headlines), /holdings (your broker, optional).
// Prices and news use Yahoo Finance's UNOFFICIAL public feed: for personal use, may change or stop, no guarantee.
// Deploy: dash.cloudflare.com > Workers & Pages > Create > paste this > Deploy. Paste the *.workers.dev address in the app's Settings.
// /holdings (optional): add secrets KITE_API_KEY and KITE_ACCESS_TOKEN (Zerodha tokens expire daily). Other brokers: change URL/fields.
const Y = 'https://query1.finance.yahoo.com', UA = {headers: {'User-Agent': 'Mozilla/5.0'}};
export default {
  async fetch(req, env) {
    const u = new URL(req.url), cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
    const out = o => new Response(JSON.stringify(o), {headers: cors});
    try {
      if (u.pathname === '/chart') {
        const j = await (await fetch(`${Y}/v8/finance/chart/${encodeURIComponent(u.searchParams.get('symbol'))}?range=6mo&interval=1d`, UA)).json();
        const c = j.chart?.result?.[0];
        return out({closes: (c?.indicators?.quote?.[0]?.close || []).filter(x => x != null), name: c?.meta?.shortName});
      }
      if (u.pathname === '/news') {
        const j = await (await fetch(`${Y}/v1/finance/search?q=${encodeURIComponent(u.searchParams.get('q'))}&newsCount=6&quotesCount=0`, UA)).json();
        return out((j.news || []).map(n => ({title: n.title, link: n.link, publisher: n.publisher})));
      }
      if (u.pathname === '/holdings') {
        const j = await (await fetch('https://api.kite.trade/portfolio/holdings', {headers: {'X-Kite-Version': '3', Authorization: `token ${env.KITE_API_KEY}:${env.KITE_ACCESS_TOKEN}`}})).json();
        return out((j.data || []).map(h => ({symbol: h.tradingsymbol, exchange: h.exchange, qty: h.quantity, avg: h.average_price})));
      }
    } catch (e) {}
    return out([]);
  }
};
