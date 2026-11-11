# Share Signals
Free watchlist and buy/hold/sell signal app for NSE, BSE, NASDAQ, NYSE, LSE, TSX, ASX, SGX. Works offline (installable PWA). No sign-up, no ads, no data collected; everything is stored in your browser.

**Warning:** signals are simple algorithms on past prices. No guarantee, not financial advice, use at your own risk. The author and app are not responsible for any loss.

## Host free on GitHub Pages
1. Create a repo, upload `index.html`, `sw.js`, `manifest.json`, `README.md`.
2. Settings → Pages → Deploy from branch `main` / root.
3. Open `https://<username>.github.io/<repo>/` and use "Install / Add to Home screen".

## Live prices
Settings tab → paste a free Twelve Data API key. Without it, the app uses demo prices.

## About the builder
VB — Venkateswararao Banday. I build apps with AI and share them free. WhatsApp +91 9962507575 · WhatsApp +44 7391 522993 · LinkedIn: linkedin.com/in/venkateswararao-banday

## Broker sync (optional)
Deploy `broker-proxy.js` as a free Cloudflare Worker with your own broker token as secrets, then paste the Worker URL in Settings and press "Sync from broker" in My portfolio. Your keys stay in your Worker, not in the app. Read-only: the app never places orders.
