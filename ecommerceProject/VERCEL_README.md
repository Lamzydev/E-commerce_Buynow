Vercel deployment checklist
==========================

1) Set backend URL env var

- In the Vercel dashboard for your frontend project, go to Settings → Environment Variables.
- Add a variable:
  - Name: `VITE_API_URL`
  - Value: `https://your-backend-host.com` (just the origin, do NOT include a trailing `/api`)
  - Environment: set for `Production` and `Preview` (and `Development` if you want)

2) Redeploy

- Trigger a redeploy (push a commit or use "Redeploy" in the dashboard).

3) Verify network calls

- Open the deployed site and check DevTools → Network. Confirm requests go to `https://your-backend-host.com/api/...` and return 200.
- Example curl to test the products endpoint:

```bash
curl -I https://<your-vercel-site>.vercel.app/api/products
```

4) If requests still go to `/.api/...` or return 404

- Confirm `VITE_API_URL` is set and correctly spelled. Vite only exposes env vars that start with `VITE_`.
- Confirm the frontend was rebuilt after the env var change (Vercel will rebuild on redeploy).

5) CORS and backend readiness

- The backend in this repo uses `cors()` with default settings (allows all origins). If you change CORS, ensure your Vercel domain is allowed.
- Ensure the backend is reachable from the public internet and listening on the correct port (use `process.env.PORT` in production).

6) If you want me to inspect the deployed site

- Provide the deployed frontend URL (e.g. `https://my-site.vercel.app`) and I will fetch the endpoints and check where API requests are going and what errors are returned.
