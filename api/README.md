# Layover API — Email Subscription Backend

Node.js/Express service that collects email subscribers for the Layover travel site.

## Stack

- **Runtime**: Node.js ≥ 18
- **Framework**: Express
- **Storage**: SQLite (via `better-sqlite3`) — zero-config, single file
- **Optional**: Mailchimp Marketing API v3 sync

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/subscribe` | Subscribe an email address |
| `GET`  | `/api/subscribe?key=<ADMIN_KEY>` | Export all subscribers (JSON) |
| `GET`  | `/health` | Health check |

### POST `/api/subscribe`

**Body** (JSON):
```json
{ "email": "user@example.com", "source": "homepage" }
```

**Responses**:
- `201` — subscribed successfully
- `200` — already subscribed
- `400` — invalid email
- `429` — rate limited (5 req / 15 min per IP)

## Local Development

```bash
cd api
npm install
cp .env.example .env   # edit values
npm run dev            # starts on port 3001 with auto-reload
```

## Deploying to Render (free tier)

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect the `beccaruffalo25/layover-site` repository
3. Set **Root Directory** → `api`
4. Set **Build Command** → `npm install`
5. Set **Start Command** → `node server.js`
6. Add environment variables from `.env.example` in the Render dashboard
7. After first deploy, copy the service URL (e.g. `https://layover-api.onrender.com`)
8. Update `API_BASE` in `js/main.js` to match that URL

### Persistent disk (important for SQLite)

Render free tier uses ephemeral storage — the SQLite file will be wiped on redeploy.
To persist data, either:
- Add a **Render Disk** (paid) and set `DB_PATH` to the disk mount path, or
- Enable Mailchimp sync — subscribers are stored in Mailchimp regardless of redeploys

## Mailchimp Integration (optional)

Set `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` in `.env`.  
Every new subscriber is also added to your Mailchimp audience automatically.

Find your API key: Mailchimp → Account → Extras → API keys  
Find your List ID: Audience → Settings → Audience name and defaults

## Exporting Subscribers

```bash
curl "https://layover-api.onrender.com/api/subscribe?key=YOUR_ADMIN_KEY"
```

Returns JSON with `count` and full `subscribers` array.
