# Swisscare ChatBar — Webflow Code Component Guide

## Architecture Overview

Webflow Code Components are React components that run inside Webflow's Designer and published sites.
They are developed locally, published to a Webflow Workspace library, then installed into individual sites.

Flow: Local dev → webflow publish → Workspace library → Install into site → Drag onto canvas

---

## 1. Prerequisites

- Node.js 18+
- A Webflow account with a Workspace
- Webflow CLI installed globally (or use npx)

---

## 2. Local Setup

```bash
# Clone / navigate to project
cd webflow-app

# Install dependencies
npm install

# Option A: Vite dev server (plain browser preview)
npm run dev
# Open http://localhost:5173

# Option B: Webflow CLI dev server (connects to Designer)
npx webflow dev
# Follow prompts to authenticate and connect to your Workspace
```

---

## 3. Authenticate with Webflow

```bash
npx webflow login
```

Opens a browser window. Sign in with your Webflow account. Your token is stored locally.

---

## 4. Run Webflow Dev Server

```bash
npx webflow dev
```

This starts a local dev server on port 1337 (set in `webflow.json`).
Open your Webflow site in the Designer → Apps panel → connect to localhost:1337.
The ChatBar component will appear in your component list.

**Hot reload:** Changes to `ChatBar.tsx` or `ChatBar.module.css` are reflected immediately in the Designer.

---

## 5. Edit Props in the Designer

When the component is selected on the canvas:
- Open the right panel → "Component Properties"
- All props defined in `ChatBar.webflow.tsx` appear here
- Edit Assistant Name, Welcome Title, colors, etc.
- Changes preview instantly in the canvas

---

## 6. Publish to Workspace

When you're happy with the component:

```bash
npx webflow publish
```

This builds and uploads the component library to your Webflow Workspace.
It will be available to all sites in your Workspace.

---

## 7. Install into a Site

1. In Webflow Designer, open the site you want to use the component in
2. Go to Apps panel (left sidebar)
3. Find "Swisscare ChatBar" in your Workspace components
4. Click Install
5. The component appears in your Add Elements panel under "Components"

---

## 8. Insert and Configure

1. Drag "Swisscare Chat Bar" onto any page
2. It renders as a fixed bottom bar (position: fixed, bottom: 0)
3. Select it → edit props in the right panel:
   - **Assistant Name** — displayed in bar and chat header
   - **Welcome Title / Subtitle** — shown before first message
   - **Accent Color** — yellow by default (#f8ef78)
   - **Sample Questions** — comma-separated list
   - etc.

---

## 9. Wire a Real AI Backend (Custom Code)

The component's `onSendMessage` prop is code-level only — it cannot be set in the Webflow Designer.
The component defaults to demo (lorem ipsum) mode when `onSendMessage` is not provided.

To connect a real AI backend, the site must use a wrapper component or embed script that passes the prop programmatically. The recommended approach is to create a thin Webflow page embed that renders `<ChatBar onSendMessage={...} />` directly, or to use a server-side integration where the AI response is proxied through your own API and wired at the application level — outside the Webflow Designer.

This is intentionally out of scope for the component itself. The component's job is UI only.

---

## 10. Update / Version the Component

After making changes locally:

```bash
# Bump version in package.json
npm version patch  # or minor, major

# Publish updated version
npx webflow publish
```

Webflow will show a "Update available" banner in sites that have the component installed.
Site owners can choose when to update.

---

## 11. Common Issues

| Issue | Solution |
|---|---|
| `webflow dev` can't connect | Check port 1337 is free: `lsof -i :1337` |
| Props not showing in Designer | Verify `ChatBar.webflow.tsx` exports `declareComponent` at module level |
| Styles leaking into page | CSS Modules scope styles automatically — check for any global CSS you added |
| Component not found after publish | Wait 30s and refresh Designer; check Webflow Workspace → Apps |
| `onSendMessage` not called | Verify the prop is passed via page custom code (see step 9) |
