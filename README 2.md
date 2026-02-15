# Design Build Landscapes MN — Consultation Form

Auto-advancing multi-step lead capture form for [designbuildlandscapesmn.com](https://designbuildlandscapesmn.com). Posts leads to a CRM webhook on submission.

## Stack

- **React 18** + **Vite** + **Tailwind CSS**
- Deployed on **Railway** (static build)
- Embedded on the main site via `<iframe>`

## Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_USER/designbuild-consultation-form.git
cd designbuild-consultation-form
npm install

# Configure env
cp .env.example .env
# Edit .env with your CRM credentials

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Set these in **Railway → Service → Variables** (they're bundled at build time):

| Variable           | Description                     |
| ------------------ | ------------------------------- |
| `VITE_FORM_ID`     | CRM form UUID for lead routing  |
| `VITE_WEBHOOK_URL` | CRM webhook POST endpoint       |
| `VITE_API_KEY`     | Bearer token for authentication |

> **Important:** Because Vite inlines `VITE_*` vars at build time, you must **redeploy** after changing any variable.

## Deploy to Railway

1. Push this repo to GitHub
2. In [Railway](https://railway.app), click **New Project → Deploy from GitHub Repo**
3. Select this repo — Railway auto-detects the `railway.json` config
4. Go to **Variables** tab and add:
   - `VITE_FORM_ID`
   - `VITE_WEBHOOK_URL`
   - `VITE_API_KEY`
5. Railway builds and deploys automatically
6. Add a custom domain or use the `*.up.railway.app` URL

## Embed on Your Website

Add this wherever you want the form to appear (e.g. `/contact` page):

```html
<iframe
  src="https://YOUR-RAILWAY-DOMAIN.up.railway.app"
  style="width: 100%; min-height: 700px; border: none;"
  title="Request a Consultation"
></iframe>
```

Or as a full-page redirect:

```html
<a href="https://YOUR-RAILWAY-DOMAIN.up.railway.app">Request a Consultation</a>
```

## Webhook Payload

On form submission, the app sends a `POST` request:

```json
{
  "form_id": "your-form-uuid",
  "source": "website",
  "lead": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(651) 555-0123",
    "zip_code": "55125"
  },
  "meta": {
    "service_interest": "Outdoor Patios",
    "project_description": "We'd like a new patio...",
    "timeline": "3-6months",
    "budget": "50-100k",
    "submitted_at": "2026-02-14T17:30:00.000Z",
    "page_url": "https://designbuildlandscapesmn.com/contact"
  }
}
```

## Form Flow

1. **Service Selection** — 8 icon cards, auto-advances on tap
2. **ZIP Code** — auto-advances when 5 valid MN digits entered
3. **Name** — first + last
4. **Contact** — email + phone with validation
5. **Project Details** — description, timeline, budget (optional)
6. **Confirmation** — success screen

## License

Private — Design Build Landscapes MN
