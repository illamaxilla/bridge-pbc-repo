# BRIDGE PBC

A Ghana Public Benefit Corporation website.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Development

```sh
# Install dependencies
npm install

# Copy env template and fill in credentials
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build
```

## Request Access intake & email relay

The "Request Access" form on the homepage routes through a serverless endpoint
at `/api/request-access`, implemented in `server/request-access.js` and exposed
as a Netlify Function (`netlify/functions/request-access.js`) in production. In
development, Vite serves the same endpoint via middleware so no extra setup is
required locally.

The handler:

1. Validates the payload server-side.
2. Inserts the request into the Supabase `access_requests` table (via the
   service role key so it bypasses RLS).
3. Relays two emails via [Resend](https://resend.com):
   - **Admin notification** to `ACCESS_REQUEST_NOTIFY_EMAIL`
   - **Applicant confirmation** to the submitter's address

### Required environment variables

Set these in your `.env` file locally and in the Netlify site settings for
production.

| Variable                         | Purpose                                          |
|----------------------------------|--------------------------------------------------|
| `VITE_SUPABASE_URL`              | Supabase project URL (client + server fallback)  |
| `VITE_SUPABASE_ANON_KEY`         | Supabase anon key (client)                       |
| `SUPABASE_SERVICE_ROLE_KEY`      | Server-side writes, bypasses RLS                 |
| `RESEND_API_KEY`                 | Email relay API key                              |
| `ACCESS_REQUEST_FROM_EMAIL`      | Verified Resend sender, e.g. `BRIDGE <hi@…>`    |
| `ACCESS_REQUEST_NOTIFY_EMAIL`    | Admin inbox for new-request notifications        |
| `ANTHROPIC_API_KEY`              | BRIDGE AI Chat (separate endpoint)               |

If the Resend variables are unset, the handler still records the request and
logs a warning; emails are simply skipped. This lets you deploy incrementally.

### Approving an access request

Requests land in the `access_requests` table. To grant a user access:

1. Review the row in the Supabase dashboard.
2. Create a Supabase Auth user for the applicant (Dashboard → Authentication →
   Users → Invite user), which triggers the `profiles` row via the
   `handle_new_user` trigger.
3. Update the user's `membership_tier` in `profiles` if they need paid access.
