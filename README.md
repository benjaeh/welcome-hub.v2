This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ActiveCampaign Check-in Integration

The check-in form posts to `POST /api/checkin`.
This route now supports ActiveCampaign as the primary destination.

Set these environment variables in Vercel or `.env.local`:

- `ACTIVE_CAMPAIGN_API_URL` or `ACTIVE_CAMPAIGN_URL`
  - Example: `https://youraccount.api-us1.com` (the route appends `/api/3` automatically if needed)
- `ACTIVE_CAMPAIGN_API_KEY`
- `ACTIVE_CAMPAIGN_LIST_IDS` (optional, comma-separated list ids, recommended)
- `ACTIVE_CAMPAIGN_LIST_ID` (optional legacy single list id, still supported)
- `ACTIVE_CAMPAIGN_TAG_IDS` (optional, comma-separated)

Optional fallback destination:

- `GOOGLE_SHEETS_WEBHOOK_URL`

Behavior:

- If ActiveCampaign is configured, check-ins are synced there.
- If `GOOGLE_SHEETS_WEBHOOK_URL` is also configured, submissions are also posted there.
- If neither destination is configured, `/api/checkin` returns `500`.
