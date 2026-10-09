# BuyNow Ecommerce

## Supabase customer accounts

Create a Supabase project and set its project URL and publishable (or legacy anon) key in `ecommerceProject/.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
VITE_API_URL=http://localhost:3000
```

Set matching `SUPABASE_URL` and `SUPABASE_ANON_KEY` values in `ecommerce-backend/.env`, then restart both the frontend and API. The backend uses the public anon key only to verify access tokens with Supabase Auth; never put a Supabase service-role key in the browser or commit secrets.

In Supabase Authentication settings, enable email/password sign-in and configure these allowed redirect URLs for local development:

- `http://localhost:5173/account/sign-in`
- `http://localhost:5173/reset-password`

Add the corresponding production URLs before deployment. With email confirmation enabled, new customers receive a confirmation email before they can sign in. Configure Supabase SMTP/email delivery for production.

Cart, checkout, payment summary, and order endpoints require a valid Supabase bearer token. Cart and order rows are associated with the authenticated user's Supabase UUID. Existing demo cart/order rows have no owner and are not shown to customer accounts.

Run the frontend from `ecommerceProject` with `npm run dev` and the API from `ecommerce-backend` with `npm run dev`.

## Original Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
