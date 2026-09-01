## Intro to the Project
This is the backend for the [ecommerce-project](https://github.com/SuperSimpleDev/ecommerce-project).
- 95% of the code was generated with AI.

## Video Tutorials
**Part 1 - Create the Backend:** https://youtu.be/vBprybSmJs8

## Set up this backend
1. Make sure you have NodeJS installed (version 22+). If not, [click here to install](https://nodejs.org/).
2. Download this code by clicking the green `Code` button (in the top-right) > Click `Download Zip`.
3. Unzip the code. On Windows, right-click the zip file > `Extract All`. On Mac, double-click the zip file.
4. Open this code in VSCode.
5. At the top menu of VSCode, click `Terminal` > `New Terminal`.
6. In the Terminal, run `npm install`, and run `npm run dev`.

## Troubleshooting
If you run into issues, see the [troubleshooting steps](troubleshooting.md).

## Deployment
This backend is a Node/Express app (entry point `server.js`). You can deploy it to many providers; below are common options and commands.

1) Deploy to a Platform-as-a-Service (Heroku / Render / Railway)

- Ensure `start` script is present in `package.json` (this project already has `"start": "node server.js"`).
- Commit your code and push to the provider (example for Heroku):

```bash
# create app (once)
heroku create my-ecommerce-backend

# push to Heroku (main or master branch)
git push heroku main

# scale web dyno
heroku ps:scale web=1
```

- For Render or Railway, create a new Web Service, connect your repo, and set the start command to `npm start`.

2) Deploy with Docker (container)

- Example `Dockerfile` (add to repo root):

```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

- Build and run locally:

```bash
docker build -t ecommerce-backend .
docker run -p 3000:3000 ecommerce-backend
```

3) Notes for Vercel / Serverless

- Vercel is optimized for static sites and serverless functions. Deploying a long-running Express server directly to Vercel is not supported in the same way as the other providers.
- Options:
	- Convert your API routes into Vercel Serverless Functions under an `/api` folder (requires refactor).
	- Deploy the backend to a traditional server (Heroku, Render, Railway, DigitalOcean) and point the frontend to that URL.

4) Environment & persistence

- This project uses `sql.js` (in-memory SQLite) by default which is suitable for demos. For production, use a hosted DB (Postgres/MySQL) and set connection details via environment variables. Update `models/index.js` and `server.js` accordingly.

5) Health check & readiness

- Ensure your host exposes port `3000` or the value of `process.env.PORT`.
- Add a lightweight health endpoint (e.g., `GET /health`) if your host requires it.

If you want, I can add a ready-to-run `Dockerfile` and a sample `Procfile` for Heroku, or draft serverless function stubs for Vercel — tell me which target you prefer and I will add the files.
