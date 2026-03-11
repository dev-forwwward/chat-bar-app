# Swisscare ChatBar — Webflow Code Component Guide

## Architecture Overview

Webflow Code Components are React components that run inside Webflow's Designer and published sites.
They are developed locally, published to a Webflow Workspace library, then installed into individual sites.

Flow: Local dev → `webflow library share` → Workspace library → Install into site → Drag onto canvas

---

## 1. Prerequisites

- Node.js 18+
- A Webflow account with a Workspace

---

## 2. Local Setup

```bash
# Install dependencies
npm install

# Vite dev server — plain browser preview (no Webflow Designer)
npm run dev
# Open http://localhost:5173
```

---

## 3. Publish to Workspace

When you're ready to share the component with your Webflow Workspace:

```bash
npx webflow library share
```

This command will:
1. Open a browser window and ask you to authenticate with Webflow (one-time)
2. Ask for a library name and description
3. Ask whether your code is trusted and secure
4. Compile the component and upload it to your Workspace

No separate login step is needed — authentication is handled automatically.

---

## 4. Install into a Site

1. Open your Webflow site in the Designer
2. Go to **Apps** panel (left sidebar) → **Libraries**
3. Find the library you just published (e.g. "Swisscare code components")
4. Click **Install**
5. The component appears in the **Add Elements** panel under "Components"

---

## 5. Insert and Configure

1. Drag **Swisscare Chat Bar** onto any page
2. It renders as a fixed bottom bar (`position: fixed; bottom: 0`)
3. Select the component → edit props in the right panel:

| Prop | Default | Description |
|---|---|---|
| Assistant Name | Swisscare Assistant | Shown in bar and chat header |
| Welcome Title | How can I help you today? | Heading before first message |
| Welcome Subtitle | (long text) | Subtext before first message |
| Input Placeholder | Ask Swisscare Assistant… | Textarea placeholder |
| Input Hint | Official insurance documents always prevail. | Small text below input |
| Sample Questions | (3 defaults) | Comma-separated, rotates in closed bar |
| Accent Color | #f8ef78 | Button and highlight color |
| Bar Background Color | #0e0e0e | Color of the closed bottom bar |
| Chat Background Color | #212121 | Color of the open chat panel |
| Data Retention Days | 7 | Number shown in retention badge |
| Show Privacy Mode Button | true | Toggles the eye icon |
| Show Data Retention Badge | true | Toggles the shield/days badge |
| Powered By Text | (empty) | Optional branding text |
| Powered By URL | (empty) | Optional branding link |

---

## 6. Live Dev Server (Designer connection)

To preview code changes live inside the Webflow Designer without republishing:

```bash
npx webflow devlink
```

Requires `WEBFLOW_SITE_ID` and `WEBFLOW_SITE_API_TOKEN` in a `.env` file (or pass as `--site` and `--api-token` flags):

```
WEBFLOW_SITE_ID=your-site-id
WEBFLOW_SITE_API_TOKEN=wf_your-token
```

**Where to find these:**
- **Site ID**: Webflow Designer → Site Settings → General → Site Details
- **API Token**: Webflow Designer → Site Settings → Apps & Integrations → API Access → Generate API Token (needs Custom Code scope)

Once running, connect in the Designer under **Apps → devlink → localhost:1337**.
Hot reload: changes to `ChatBar.tsx` or `ChatBar.styles.ts` are reflected immediately.

---

## 7. Wire a Real AI Backend (Custom Code)

The component's `onSendMessage` prop is code-level only — it cannot be set in the Webflow Designer.
When not provided the component runs in demo mode (lorem ipsum responses).

To connect a real AI backend, pass the prop via Webflow's **Before `</body>` tag** custom code:

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Your framework/embed will expose the ChatBar instance here
    // and you can pass onSendMessage as a prop
  })
</script>
```

The component's `onSendMessage` signature:
```ts
(message: string, history: Message[]) => Promise<string>
```

---

## 8. Update / Version the Component

After making changes locally:

```bash
# Bump version in package.json
npm version patch  # or minor, major

# Re-publish
npx webflow library share
```

Webflow will show an **Update available** banner in sites that have the component installed.
Site owners can choose when to update.

---

## 9. Common Issues

| Issue | Solution |
|---|---|
| `webflow library share` fails to compile | Run `npm run build` locally first to see TypeScript errors |
| Props not showing in Designer | Verify `ChatBar.webflow.tsx` exports `declareComponent` at module level |
| Styles not applying in Designer | Styles are injected via `<style>` tag — check `ChatBar.styles.ts` for the rule |
| Component not found after publish | Wait 30s and refresh Designer; check Webflow Workspace → Apps → Libraries |
| `devlink` says missing env vars | Add `WEBFLOW_SITE_ID` and `WEBFLOW_SITE_API_TOKEN` to `.env` (see step 6) |
| `onSendMessage` not called | Verify the prop is passed via page custom code (see step 7) |
