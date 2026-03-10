# ChatBar — React + Vite + Webflow Code Component Design

**Date:** 2026-03-10
**Source:** `index-v0.html` (1,270-line single-file vanilla HTML/CSS/JS implementation)
**Goal:** Convert to a React component, Vite-based project, and Webflow Code Component

---

## Overview

Convert the Swisscare AI chat bar widget from vanilla HTML/CSS/JS into a React component that:
1. Can be developed locally with Vite (hot reload, browser preview)
2. Can be registered and published as a Webflow Code Component
3. Is a pure UI component — no AI integration built in; consumers wire their own backend via `onSendMessage` prop

---

## Architecture

**Approach:** Vite app + Webflow CLI side-by-side (single repo, two entry points)

- `index.html` + Vite dev server for local browser preview with hot reload
- `ChatBar.webflow.tsx` for Webflow registration via `@webflow/webflow-cli`
- Both share the same `ChatBar.tsx` component

---

## File Structure

```
webflow-app/
├── dist/
├── node_modules/
├── src/
│   └── components/
│       ├── ChatBar.module.css      # All styles (CSS Modules, scoped)
│       ├── ChatBar.tsx             # Single React component — all UI + logic
│       └── ChatBar.webflow.tsx     # Webflow declareComponent + prop bindings
├── index.html                      # Vite dev shell
├── .env
├── package.json
├── tsconfig.json
└── webflow.json
```

---

## Component: `ChatBar.tsx`

Single React component. No sub-components. All UI and logic in one file.

### UI States

- **Closed:** Fixed bottom bar with aurora gradient animation, orbiting dots (NeoPulse), rotating sample questions, animated send button
- **Open:** Expands to full viewport height with:
  - Top bar: assistant name + close button
  - Chat panel: welcome screen (centered input) or message thread
  - Bottom bar: New Chat, Privacy toggle, Retention badge, Save chat

### State

| Name | Type | Purpose |
|---|---|---|
| `isOpen` | `boolean` | Bar expanded or collapsed |
| `firstSent` | `boolean` | Controls welcome→chat transition |
| `isBusy` | `boolean` | Waiting for AI response |
| `privacyMode` | `boolean` | Private session active |
| `retentionOpen` | `boolean` | Data retention popup visible |
| `messages` | `Message[]` | Full message history |
| `inputValue` | `string` | Controlled textarea value |
| `streamingId` | `string \| null` | ID of message currently being word-streamed |
| `activeQuestionIndex` | `number` | Current rotating sample question |

### Key Logic

- `toggleChat()` → `setIsOpen(!isOpen)`
- `sendMessage()` → appends user message, calls `onSendMessage` prop, streams response word-by-word via `setInterval` in `useEffect`
- `clearChat()` → resets all state to initial values
- `togglePrivacy()` → flips `privacyMode`, hides retention badge when active
- `toggleRetention()` → opens/closes retention popup
- `deleteData()` → calls `clearChat()`, shows "Data deleted" confirmation, closes popup
- `saveChat()` → downloads messages as `.txt` via Blob URL
- Rotating questions → `useEffect` + `setInterval`, index in state
- Auto-resize textarea → `useRef` on textarea + `useEffect` watching `inputValue`
- Word-by-word streaming → `useEffect` with `setInterval`, writes one word at a time into streaming message content

### Types

```ts
interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

interface ChatBarProps {
  // Copy
  assistantName?: string
  welcomeTitle?: string
  welcomeSubtitle?: string
  inputPlaceholder?: string
  inputHint?: string
  sampleQuestions?: string[]
  poweredByText?: string
  poweredByUrl?: string

  // Colors
  accentColor?: string
  barBackground?: string
  chatBackground?: string

  // Features
  privacyModeEnabled?: boolean
  dataRetentionDays?: number
  dataRetentionEnabled?: boolean

  // Callback
  onSendMessage?: (message: string, history: Message[]) => Promise<string>
}
```

### Default `onSendMessage` (demo fallback)

When `onSendMessage` is not provided, the component uses a built-in demo function that returns random lorem ipsum responses after a short delay. This allows the component to be previewed in Webflow without any backend.

### Styling

CSS Modules (`ChatBar.module.css`). All existing CSS from `index-v0.html` is ported verbatim, with class names converted to camelCase for CSS Modules usage. Dynamic styles (accent color, bar background, chat background) applied via inline `style` props using CSS custom properties:

```tsx
<div style={{ '--accent': accentColor, '--bar-bg': barBackground } as React.CSSProperties}>
```

---

## Webflow Registration: `ChatBar.webflow.tsx`

Uses `declareComponent` from `@webflow/react`.

### Designer-Editable Props

| Prop | Control Type | Notes |
|---|---|---|
| `assistantName` | `attr.string` | |
| `welcomeTitle` | `attr.string` | |
| `welcomeSubtitle` | `attr.string` | |
| `inputPlaceholder` | `attr.string` | |
| `inputHint` | `attr.string` | |
| `sampleQuestions` | `attr.string` | Comma-separated in Designer, split to `string[]` in component |
| `accentColor` | `attr.string` | Hex color string |
| `barBackground` | `attr.string` | Hex color string |
| `chatBackground` | `attr.string` | Hex color string |
| `dataRetentionDays` | `attr.number` | |
| `privacyModeEnabled` | `attr.boolean` | |
| `dataRetentionEnabled` | `attr.boolean` | |
| `poweredByText` | `attr.string` | Empty = hidden |
| `poweredByUrl` | `attr.string` | |

### Not a Designer Prop

`onSendMessage` — code-level only. Omitted from `declareComponent`. Component falls back to demo mode in Webflow preview. Consumers wire real AI via custom code on the Webflow page.

---

## Packages

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@webflow/react": "latest",
    "@webflow/data-types": "latest"
  },
  "devDependencies": {
    "@webflow/webflow-cli": "latest",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "vite": "^5",
    "@vitejs/plugin-react": "^4"
  }
}
```

---

## Development Workflow

1. `npm run dev` → Vite dev server → open `localhost:5173` for browser preview
2. `npx webflow dev` → Webflow CLI dev server → connect to Webflow Designer for prop testing
3. `npx webflow publish` → publish component library to Webflow Workspace
4. In Webflow Designer → Apps → install component → drag onto canvas → edit props

---

## Decisions Log

| Decision | Choice | Reason |
|---|---|---|
| AI integration | Pure UI (`onSendMessage` prop) | Clean separation; consumers own their backend |
| Props scope | Full customization (copy + colors + features) | Reusable across brands |
| Component structure | Single component (`ChatBar.tsx`) | Simplicity; no sub-components needed |
| Styling | CSS Modules | Scoped styles, hot reload, readable 800-line CSS file |
| Architecture | Vite + Webflow CLI side-by-side | Best DX: browser preview + Webflow Designer preview |
| Folder convention | `Component.webflow.tsx` pattern | Matches user's existing project structure |
