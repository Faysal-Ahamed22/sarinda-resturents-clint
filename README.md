# SARINDA — Restaurant Client

A responsive React + Vite client for the SARINDA restaurant app. Uses Tailwind CSS + daisyUI and integrates with a deployed API and EmailJS for contact messages.

**Quick links**
- **Repository:** https://github.com/Faysal-Ahamed22/sarinda-resturents-clint
- **API base (deployed):** https://sarinda-server.vercel.app

**Stack**
- React 19 (Vite)
- Tailwind CSS + daisyUI
- Axios for secure requests (`src/Hook/useAxios.jsx`)
- EmailJS integration in the footer (`src/Pages/Shared/Foorter.jsx`)

**What this repo contains**
- Frontend client for browsing menu, ordering, cart, auth, and admin dashboard.
- Responsive layout and shared components under `src/Pages/Shared` and `src/components`.

**Preview**
- Run locally (see Setup) or view deployed client when hosted (you can deploy to Vercel/Netlify).

**Prerequisites**
- Node.js 18+ and npm

**Setup & Run (local)**
1. Clone the repo:

```bash
git clone https://github.com/Faysal-Ahamed22/sarinda-resturents-clint.git
cd final-resturents-clint
```

2. Install dependencies:

```bash
npm install
```

3. (Optional but recommended) create a file `.env` in the project root and add these variables (example below). The app currently has the API base and EmailJS values embedded; switching to environment variables is recommended for production.

Example `.env` (Vite requires `VITE_` prefix):

```ini
VITE_API_BASE_URL=https://sarinda-server.vercel.app
VITE_EMAILJS_SERVICE_ID=service_7dpq3q9
VITE_EMAILJS_TEMPLATE_ID=template_jsw7s3d
VITE_EMAILJS_PUBLIC_KEY=mUhUgcWd0h9l_BvLn
```

4. Run development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

**EmailJS integration**
- The contact form is implemented in `src/Pages/Shared/Foorter.jsx`. It uses the following (already wired in this repo):
	- Service ID: `service_7dpq3q9`
	- Template ID: `template_jsw7s3d`
	- Public key: `mUhUgcWd0h9l_BvLn`
- If you prefer environment variables, replace the hardcoded strings with `import.meta.env.VITE_EMAILJS_SERVICE_ID`, etc., and set them in your hosting provider (Vercel/Netlify).

**API base URL**
- The client currently targets `https://sarinda-server.vercel.app` (see `src/Hook/useAxios.jsx` and fetch calls in pages). To change, update the base in `src/Hook/useAxios.jsx` or centralize into `import.meta.env.VITE_API_BASE_URL`.

**Files of interest**
- `src/Hook/useAxios.jsx` — Axios instance with Authorization header interceptor.
- `src/Pages/Shared/Foorter.jsx` — Footer and EmailJS form.
- `src/Layouts/Main.jsx` — App shell (navbar + outlet + footer).

**Deployment**
- Recommended: Deploy to Vercel or Netlify. On Vercel set the `VITE_*` env vars (if you migrate to env-based config).

**Development notes & tips**
- Large image assets are included in `src/assets/` — consider optimizing for faster builds.
- If the production build emits chunk-size warnings, consider code-splitting or manual chunks in `vite.config.js`.

**Contributing**
- Create a branch, make changes, and open a PR. Keep changes focused and add screenshots for UI fixes.

**License**
- MIT

---

If you want, I can:
- Move API base and EmailJS keys to environment variables and update the code to read from `import.meta.env`.
- Add a short CONTRIBUTING.md or CI workflow for build checks.

Files created/edited by recent tasks: `src/Pages/Shared/Foorter.jsx`, `src/Hook/useAxios.jsx`.
