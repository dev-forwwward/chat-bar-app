# ChatBar React + Webflow Code Component — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `index-v0.html` (vanilla HTML/CSS/JS Swisscare AI chat bar) into a React + TypeScript Vite project that also registers as a Webflow Code Component.

**Architecture:** Single `ChatBar.tsx` component with CSS Modules (`ChatBar.module.css`), a Vite dev shell (`index.html` + `main.tsx`) for local browser preview, and a `ChatBar.webflow.tsx` registration file for Webflow. Two entry points share the same component.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, `@webflow/react`, `@webflow/webflow-cli`, Vitest, @testing-library/react

**Spec:** `docs/superpowers/specs/2026-03-10-chatbar-react-webflow-design.md`
**Source:** `index-v0.html` — read this file before starting. All CSS, HTML structure, and JS logic is defined there.

---

## Chunk 1: Project Scaffold + Types + CSS

### Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `webflow.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test-setup.ts`

- [ ] **Step 1.1: Create `package.json`**

```json
{
  "name": "swisscare-chatbar",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@webflow/react": "latest",
    "@webflow/data-types": "latest"
  },
  "devDependencies": {
    "@webflow/webflow-cli": "latest",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vitest": "^1.4.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@testing-library/jest-dom": "^6.4.0",
    "jsdom": "^24.0.0"
  }
}
```

- [ ] **Step 1.2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 1.3: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 1.4: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.5: Create `webflow.json`**

```json
{
  "schemaVersion": "1.0.0",
  "displayName": "Swisscare ChatBar",
  "devServerPort": 1337
}
```

- [ ] **Step 1.6: Create `index.html`** (Vite dev shell)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ChatBar Dev Preview</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      @font-face {
        font-family: Atypbldisplay;
        src: url("https://cdn.prod.website-files.com/6850235ccb1257ecee2e0e0d/68502eb327be5eb748e80466_AtypBLDisplay-Medium.woff2") format("woff2");
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { min-height: 100vh; background: #f0f0f0; font-family: Atypbldisplay, Georgia, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 1.7: Create `src/main.tsx`** (Vite dev entry — passes demo props)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChatBar } from './components/ChatBar'

// Demo onSendMessage — lorem ipsum fallback for local dev
const demoSend = async (_msg: string): Promise<string> => {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
  const responses = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet.\n\nSed blandit libero volutpat sed cras ornare arcu.',
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatBar
      assistantName="Swisscare Assistant"
      welcomeTitle="How can I help you today?"
      welcomeSubtitle="Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility."
      inputPlaceholder="Ask Swisscare Assistant…"
      inputHint="Official insurance documents always prevail."
      sampleQuestions={[
        'How much cost the insurance in Spain?',
        'Can you help with canton of St-Gallen?',
        'What is a cantonal exemption process?',
      ]}
      accentColor="#f8ef78"
      barBackground="#0e0e0e"
      chatBackground="#212121"
      privacyModeEnabled={true}
      dataRetentionEnabled={true}
      dataRetentionDays={7}
      onSendMessage={demoSend}
    />
  </React.StrictMode>
)
```

- [ ] **Step 1.8: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 1.9: Commit**

```bash
git add package.json tsconfig.json vite.config.ts webflow.json index.html src/main.tsx src/test-setup.ts
git commit -m "feat: scaffold Vite + Webflow project for ChatBar"
```

---

### Task 2: CSS Module

**Files:**
- Create: `src/components/ChatBar.module.css`

This is a direct port of all `<style>` blocks from `index-v0.html` into CSS Modules format. Class names stay the same (CSS Modules uses camelCase access in TSX but the CSS file itself can use kebab-case — Vite handles both). Dynamic color values (`--accent`, `--bar-bg`, `--chat-bg`) are kept as CSS custom properties so they can be overridden via inline `style` on the root element.

- [ ] **Step 2.1: Create `src/components/ChatBar.module.css`**

Port all styles from `index-v0.html` (lines 17–797). Key changes:
1. Remove `:root` block — CSS custom properties will be set via inline style on the `.aiBar` wrapper instead
2. All `#id` selectors become `.camelCase` class selectors (see mapping table below)
3. All `#ai-bar.open .foo` compound selectors become `.aiBar.open .foo`
4. Keep all `@keyframes`, `@font-face` references, and media queries as-is
5. No other changes — copy every rule verbatim except for the selector renames

**Complete selector name mapping (source HTML → CSS Module class):**

| `index-v0.html` selector | `ChatBar.module.css` class |
|---|---|
| `#ai-bar` | `.aiBar` |
| `#ai-bar.open` | `.aiBar.open` |
| `.ai-topbar` | `.aiTopbar` |
| `.ai-topbar-logo` | `.aiTopbarLogo` |
| `.chat-panel` | `.chatPanel` |
| `.chat-inner` | `.chatInner` |
| `.bar-strip` | `.barStrip` |
| `.aurora-on` | `.auroraOn` |
| `.aurora-blob` | `.auroraBlob` |
| `.aurora-blob-1` | `.auroraBlob1` |
| `.aurora-blob-2` | `.auroraBlob2` |
| `.aurora-blob-3` | `.auroraBlob3` |
| `.aurora-blob-4` | `.auroraBlob4` |
| `.bar-closed-content` | `.barClosedContent` |
| `.bar-open-content` | `.barOpenContent` |
| `.bar-open-left` | `.barOpenLeft` |
| `.bar-open-name` | `.barOpenName` |
| `.bar-open-settings` | `.barOpenSettings` |
| `.bar-text` | `.barText` |
| `.bar-text-name` | `.barTextName` |
| `.bar-text-sep` | `.barTextSep` |
| `.bar-questions` | `.barQuestions` |
| `.bar-q` | `.barQ` |
| `.bar-q-active` | `.barQActive` |
| `.neo-pulse` | `.neoPulse` |
| `.neo-pulse-ring` | `.neoPulseRing` |
| `.neo-send` | `.neoSend` |
| `.chat-welcome` | `.chatWelcome` |
| `.sticky` | `.sticky` |
| `.welcome-title` | `.welcomeTitle` |
| `.welcome-sub` | `.welcomeSub` |
| `.welcome-input-inner` | `.welcomeInputInner` |
| `.input-box` | `.inputBox` |
| `.private-mode` | `.privateMode` |
| `.private-badge` | `.privateBadge` |
| `.input-send` | `.inputSend` |
| `.input-hint` | `.inputHint` |
| `.chat-messages` | `.chatMessages` |
| `.msg-row` | `.msgRow` |
| `.user` | `.user` |
| `.ai` | `.ai` |
| `.msg-label` | `.msgLabel` |
| `.row-content` | `.rowContent` |
| `.msg-actions` | `.msgActions` |
| `.msg-act` | `.msgAct` |
| `.typing-row` | `.typingRow` |
| `.thinking-shimmer` | `.thinkingShimmer` |
| `.chat-input-area` | `.chatInputArea` |
| `.ch-close` | `.chClose` |
| `.ch-btn` | `.chBtn` |
| `.ch-divider` | `.chDivider` |
| `.ch-icon-btn` | `.chIconBtn` |
| `.ch-eye-btn` | `.chEyeBtn` |
| `.ch-retention` | `.chRetention` |
| `.ch-retention-label` | `.chRetentionLabel` |
| `.retention-popup` | `.retentionPopup` |
| `.retention-popup-title` | `.retentionPopupTitle` |
| `.retention-popup-body` | `.retentionPopupBody` |
| `.retention-delete-btn` | `.retentionDeleteBtn` |
| `.done` | `.done` |
| `.active` | `.active` |

**Starter block (then copy all remaining rules from `index-v0.html`):**

```css
/* ChatBar.module.css — full port of index-v0.html styles */

/* ── Reset scoped to aiBar ── */
.aiBar *,
.aiBar *::before,
.aiBar *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── AI Bar root ── */
.aiBar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 600;
  height: 60px;
  display: flex;
  flex-direction: column;
  transition: height .5s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  background: var(--chat-bg, #212121);
}
.aiBar.open { height: 100vh; }

/* ... continue porting ALL remaining rules from index-v0.html lines 17–797 ... */
/* Use the mapping table above for every selector rename */
```

> **Important:** Copy every CSS rule from `index-v0.html`. The full port is ~800 lines. Do not abbreviate or skip any rule.

- [ ] **Step 2.2: Verify CSS file exists and has content**

```bash
wc -l src/components/ChatBar.module.css
```

Expected: 700–900 lines.

- [ ] **Step 2.3: Commit**

```bash
git add src/components/ChatBar.module.css
git commit -m "feat: port all CSS from index-v0.html to CSS Module"
```

---

### Task 3: Types + empty component skeleton

**Files:**
- Create: `src/components/ChatBar.tsx`
- Create: `src/components/ChatBar.test.tsx`

- [ ] **Step 3.1: Write failing test first**

```tsx
// src/components/ChatBar.test.tsx
import { render, screen } from '@testing-library/react'
import { ChatBar } from './ChatBar'

describe('ChatBar', () => {
  it('renders without crashing', () => {
    render(<ChatBar />)
    // The closed bar should always be in the DOM
    expect(document.getElementById('ai-bar')).toBeInTheDocument()
  })

  it('shows assistantName in closed bar', () => {
    render(<ChatBar assistantName="Test Assistant" />)
    expect(screen.getByText('Test Assistant')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

Expected: FAIL — "Cannot find module './ChatBar'"

- [ ] **Step 3.3: Create `src/components/ChatBar.tsx` skeleton**

```tsx
import React from 'react'
import styles from './ChatBar.module.css'

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

export interface ChatBarProps {
  assistantName?: string
  welcomeTitle?: string
  welcomeSubtitle?: string
  inputPlaceholder?: string
  inputHint?: string
  sampleQuestions?: string[]
  poweredByText?: string
  poweredByUrl?: string
  accentColor?: string
  barBackground?: string
  chatBackground?: string
  privacyModeEnabled?: boolean
  dataRetentionDays?: number
  dataRetentionEnabled?: boolean
  onSendMessage?: (message: string, history: Message[]) => Promise<string>
}

const DEFAULT_QUESTIONS = [
  'How much cost the insurance in Spain?',
  'Can you help with canton of St-Gallen?',
  'What is a cantonal exemption process?',
]

export function ChatBar({
  assistantName = 'Swisscare Assistant',
  welcomeTitle = 'How can I help you today?',
  welcomeSubtitle = 'Need help with your Swisscare plan? I\'m here to answer your questions about coverage, options, or eligibility and make sure you get the support you need.',
  inputPlaceholder = 'Ask Swisscare Assistant…',
  inputHint = 'Official insurance documents always prevail.',
  sampleQuestions = DEFAULT_QUESTIONS,
  poweredByText = '',
  poweredByUrl = '',
  accentColor = '#f8ef78',
  barBackground = '#0e0e0e',
  chatBackground = '#212121',
  privacyModeEnabled = true,
  dataRetentionDays = 7,
  dataRetentionEnabled = true,
  onSendMessage,
}: ChatBarProps) {
  return (
    <div
      id="ai-bar"
      className={styles.aiBar}
      style={{
        '--accent': accentColor,
        '--bar-bg': barBackground,
        '--chat-bg': chatBackground,
      } as React.CSSProperties}
    >
      <span data-testid="assistant-name" style={{ display: 'none' }}>{assistantName}</span>
    </div>
  )
}
```

- [ ] **Step 3.4: Run test — expect PASS**

```bash
npm test -- ChatBar.test
```

Expected: PASS (2 tests)

- [ ] **Step 3.5: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: add ChatBar skeleton with types and passing smoke tests"
```

---

## Chunk 2: Closed Bar + Open State + Welcome Screen

### Task 4: Closed bar UI

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

The closed bar contains:
1. Aurora blobs (4 animated gradient divs)
2. NeoPulse (3 orbiting rings)
3. Assistant name + rotating sample questions
4. Animated send button (up arrow)

- [ ] **Step 4.1: Add test for closed bar elements**

Add to `ChatBar.test.tsx`:

```tsx
it('renders aurora blobs', () => {
  const { container } = render(<ChatBar />)
  const blobs = container.querySelectorAll('[class*="auroraBlob"]')
  expect(blobs.length).toBe(4)
})

it('renders neo pulse rings', () => {
  const { container } = render(<ChatBar />)
  const rings = container.querySelectorAll('[class*="neoPulseRing"]')
  expect(rings.length).toBeGreaterThanOrEqual(3)
})
```

- [ ] **Step 4.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 4.3: Implement closed bar in `ChatBar.tsx`**

Replace the return statement with the full closed bar structure (ported from `index-v0.html` lines 884–948):

```tsx
return (
  <div
    id="ai-bar"
    className={`${styles.aiBar}${isOpen ? ` ${styles.open}` : ''}`}
    style={{ '--accent': accentColor, '--bar-bg': barBackground, '--chat-bg': chatBackground } as React.CSSProperties}
  >
    {/* Bottom bar — always visible */}
    <div
      className={`${styles.barStrip} ${styles.auroraOn}`}
      onClick={handleToggle}
    >
      {/* Aurora blobs */}
      <div className={`${styles.auroraBlob} ${styles.auroraBlob1}`} />
      <div className={`${styles.auroraBlob} ${styles.auroraBlob2}`} />
      <div className={`${styles.auroraBlob} ${styles.auroraBlob3}`} />
      <div className={`${styles.auroraBlob} ${styles.auroraBlob4}`} />

      {/* Closed content */}
      <div className={styles.barClosedContent}>
        <NeoPulse />
        <div className={styles.barText}>
          <span className={styles.barTextName}>{assistantName}</span>
          <span className={styles.barTextSep}>|</span>
          <RotatingQuestions questions={sampleQuestions} />
        </div>
        <button
          className={styles.neoSend}
          onClick={e => { e.stopPropagation(); handleToggle() }}
          aria-label="Open chat"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Open content (settings bar) — rendered inside barStrip when open */}
      <div className={styles.barOpenContent}>
        <NeoPulse />
        <div className={styles.barOpenLeft}>
          <div className={styles.barOpenName}>{assistantName}</div>
        </div>
        <div className={styles.barOpenSettings}>
          {/* Settings controls added in Task 9–11 */}
        </div>
      </div>
    </div>
  </div>
)
```

Also add the `NeoPulse` and `RotatingQuestions` helper components **inside the same file**, above the `ChatBar` function:

```tsx
function NeoPulse() {
  return (
    <div className={styles.neoPulse}>
      <div className={styles.neoPulseRing} />
      <div className={styles.neoPulseRing} />
      <div className={styles.neoPulseRing} />
    </div>
  )
}

function RotatingQuestions({ questions }: { questions: string[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % questions.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [questions.length])

  return (
    <span className={styles.barQuestions}>
      {questions.map((q, i) => (
        <span
          key={q}
          className={`${styles.barQ}${i === activeIndex ? ` ${styles.barQActive}` : ''}`}
        >
          {q}
        </span>
      ))}
    </span>
  )
}
```

Also add at the top of the component body (before return):
```tsx
const [isOpen, setIsOpen] = React.useState(false)

function handleToggle() {
  setIsOpen(prev => !prev)
}
```

- [ ] **Step 4.4: Run test — expect PASS**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 4.5: Start Vite dev server and verify visual**

```bash
npm run dev
```

Open `http://localhost:5173`. You should see a dark bar at the bottom with aurora gradient animation, orbiting dots, assistant name, rotating questions, and a send button.

- [ ] **Step 4.6: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement closed bar with aurora, NeoPulse, rotating questions"
```

---

### Task 5: Open/close toggle + top bar + chat panel shell

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 5.1: Add test for open/close**

Update the existing import at the top of `ChatBar.test.tsx` to add `fireEvent`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
```

Then add these tests:

```tsx
it('opens when bar is clicked', () => {
  const { container } = render(<ChatBar />)
  const aiBar = container.querySelector('#ai-bar')!
  const barStrip = container.querySelector('[class*="barStrip"]')!
  expect(aiBar.className).not.toContain('open')
  fireEvent.click(barStrip)
  expect(aiBar.className).toContain('open')
})

it('closes when close button is clicked', () => {
  const { container } = render(<ChatBar />)
  const barStrip = container.querySelector('[class*="barStrip"]')!
  fireEvent.click(barStrip) // open
  const closeBtn = container.querySelector('[data-testid="close-btn"]')!
  fireEvent.click(closeBtn)
  expect(container.querySelector('#ai-bar')!.className).not.toContain('open')
})
```

- [ ] **Step 5.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 5.3: Add top bar + chat panel shell to `ChatBar.tsx`**

Insert above the `barStrip` div:

```tsx
{/* Top bar — visible only when open */}
<div className={styles.aiTopbar}>
  <div className={styles.aiTopbarLogo}>{assistantName}</div>
  <button
    className={styles.chClose}
    data-testid="close-btn"
    title="Close"
    onClick={e => { e.stopPropagation(); setIsOpen(false) }}
    aria-label="Close chat"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  </button>
</div>

{/* Chat panel */}
<div className={styles.chatPanel}>
  <div className={styles.chatInner}>
    {/* Welcome state + messages + input added in Tasks 6–7 */}
  </div>
</div>
```

Also add a `useEffect` to focus input when opened (add after `isOpen` state):
```tsx
const topInputRef = React.useRef<HTMLTextAreaElement>(null)
React.useEffect(() => {
  if (isOpen) {
    setTimeout(() => topInputRef.current?.focus(), 500)
  }
}, [isOpen])
```

- [ ] **Step 5.4: Run test — expect PASS**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 5.5: Visual check** — click bar, panel should expand to full height with top bar visible.

- [ ] **Step 5.6: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement open/close toggle with top bar and chat panel shell"
```

---

### Task 6: Welcome screen

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 6.1: Add test for welcome screen**

```tsx
it('shows welcome title and subtitle when open and no messages', () => {
  const { container } = render(
    <ChatBar welcomeTitle="Hello!" welcomeSubtitle="How can I help?" />
  )
  const barStrip = container.querySelector('[class*="barStrip"]')!
  fireEvent.click(barStrip)
  expect(screen.getByText('Hello!')).toBeInTheDocument()
  expect(screen.getByText('How can I help?')).toBeInTheDocument()
})

it('shows input placeholder', () => {
  const { container } = render(<ChatBar inputPlaceholder="Type here…" />)
  const barStrip = container.querySelector('[class*="barStrip"]')!
  fireEvent.click(barStrip)
  expect(screen.getByPlaceholderText('Type here…')).toBeInTheDocument()
})
```

- [ ] **Step 6.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 6.3: Add welcome state to `chatInner` in `ChatBar.tsx`**

Add state at top of component:
```tsx
const [firstSent, setFirstSent] = React.useState(false)
```

Add to `chatInner`:
```tsx
{/* Welcome state */}
<div className={`${styles.chatWelcome}${firstSent ? ` ${styles.sticky}` : ''}`}>
  <div className={styles.welcomeTitle}>{welcomeTitle}</div>
  <div className={styles.welcomeSub}>{welcomeSubtitle}</div>
  {!firstSent && (
    <div className={styles.welcomeInputInner}>
      <div className={`${styles.inputBox}${privacyMode ? ` ${styles.privateMode}` : ''}`}>
        {privacyMode && <PrivateBadge />}
        <textarea
          ref={topInputRef}
          className={styles.textarea}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className={styles.inputSend} onClick={handleSend} disabled={isBusy || !inputValue.trim()} aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <span className={styles.inputHint}>{inputHint}</span>
    </div>
  )}
</div>
```

Add state:
```tsx
const [inputValue, setInputValue] = React.useState('')
const [isBusy, setIsBusy] = React.useState(false)
const [privacyMode, setPrivacyMode] = React.useState(false)

function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function handleSend() {
  // Implemented in Task 7. The Send button is visible but non-functional at this stage — expected.
}
```

Add `PrivateBadge` helper above `ChatBar`:
```tsx
function PrivateBadge() {
  return (
    <div className={styles.privateBadge}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      Private session
    </div>
  )
}
```

- [ ] **Step 6.4: Run test — expect PASS**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 6.5: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement welcome screen with title, subtitle, and input"
```

---

## Chunk 3: Chat Logic + Settings Features

### Task 7: Send message + message rendering + AI streaming

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 7.1: Add tests for utility functions**

These are pure functions — test them in isolation:

```tsx
import { formatText, escapeHtml } from './ChatBar'

describe('formatText', () => {
  it('converts **bold** to <strong>', () => {
    expect(formatText('**hello**')).toContain('<strong>hello</strong>')
  })
  it('converts *italic* to <em>', () => {
    expect(formatText('*hello*')).toContain('<em>hello</em>')
  })
  it('wraps paragraphs in <p> tags', () => {
    expect(formatText('a\n\nb')).toBe('<p>a</p><p>b</p>')
  })
})

describe('escapeHtml', () => {
  it('escapes < and >', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
  })
  it('escapes &', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b')
  })
})
```

- [ ] **Step 7.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 7.3: Export utility functions from `ChatBar.tsx`**

Add above `ChatBar` function:

```tsx
export function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
}

const DEMO_RESPONSES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet.\n\nSed blandit libero volutpat sed cras ornare arcu.',
  'Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat.\n\nEtiam erat velit scelerisque in dictum non consectetur.',
]

async function defaultSendMessage(_msg: string, _history: Message[]): Promise<string> {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
  return DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
}
```

- [ ] **Step 7.4: Run utility tests — expect PASS**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 7.5: Implement full `handleSend` + message state + streaming**

Add state:
```tsx
const [messages, setMessages] = React.useState<Message[]>([])
const [streamingId, setStreamingId] = React.useState<string | null>(null)
const messagesEndRef = React.useRef<HTMLDivElement>(null)
const bottomInputRef = React.useRef<HTMLTextAreaElement>(null)
```

Implement `handleSend`:
```tsx
async function handleSend() {
  const text = inputValue.trim()
  if (!text || isBusy) return

  if (!firstSent) {
    setFirstSent(true)
  }

  const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
  const aiMsgId = crypto.randomUUID()
  const aiMsg: Message = { id: aiMsgId, role: 'ai', content: '' }

  setMessages(prev => [...prev, userMsg, aiMsg])
  setInputValue('')
  setIsBusy(true)
  setStreamingId(aiMsgId)

  try {
    const sendFn = onSendMessage ?? defaultSendMessage
    const reply = await sendFn(text, [...messages, userMsg])

    // Word-by-word streaming
    const words = reply.split(' ')
    let i = 0
    const interval = setInterval(() => {
      if (i < words.length) {
        const word = words[i++]
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMsgId
              ? { ...m, content: m.content + (m.content ? ' ' : '') + word }
              : m
          )
        )
      } else {
        clearInterval(interval)
        setStreamingId(null)
        setIsBusy(false)
        setTimeout(() => bottomInputRef.current?.focus(), 50)
      }
    }, 38)
  } catch {
    setMessages(prev =>
      prev.map(m =>
        m.id === aiMsgId
          ? { ...m, content: "Sorry, I'm having a connection issue. Please try again." }
          : m
      )
    )
    setStreamingId(null)
    setIsBusy(false)
  }
}
```

Auto-scroll to bottom:
```tsx
React.useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])
```

Add messages area + bottom input to `chatInner` (after welcome div):
```tsx
{/* Messages */}
{firstSent && (
  <div className={styles.chatMessages}>
    {messages.map(msg => (
      <MessageRow
        key={msg.id}
        message={msg}
        assistantName={assistantName}
        isStreaming={msg.id === streamingId}
        accentColor={accentColor}
      />
    ))}
    {isBusy && streamingId && messages.find(m => m.id === streamingId)?.content === '' && (
      <div className={styles.typingRow}>
        <span className={styles.thinkingShimmer}>Thinking…</span>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>
)}

{/* Bottom input */}
{firstSent && (
  <div className={styles.chatInputArea}>
    <div className={`${styles.inputBox}${privacyMode ? ` ${styles.privateMode}` : ''}`}>
      {privacyMode && <PrivateBadge />}
      <textarea
        ref={bottomInputRef}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isBusy}
      />
      <button className={styles.inputSend} onClick={handleSend} disabled={isBusy || !inputValue.trim()} aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <span className={styles.inputHint}>{inputHint}</span>
  </div>
)}
```

Add `MessageRow` helper above `ChatBar`:
```tsx
function MessageRow({
  message,
  assistantName,
  isStreaming,
  accentColor,
}: {
  message: Message
  assistantName: string
  isStreaming: boolean
  accentColor: string
}) {
  if (message.role === 'user') {
    return (
      <div className={`${styles.msgRow} ${styles.user}`}>
        <div className={styles.msgLabel}>You</div>
        <div
          className={styles.rowContent}
          dangerouslySetInnerHTML={{ __html: escapeHtml(message.content) }}
          style={{ background: accentColor, color: '#111' } as React.CSSProperties}
        />
      </div>
    )
  }
  return (
    <div className={`${styles.msgRow} ${styles.ai}`}>
      <div style={{ maxWidth: '80%', width: '100%' }}>
        <div className={styles.msgLabel}>{assistantName}</div>
        <div
          className={styles.rowContent}
          dangerouslySetInnerHTML={{ __html: formatText(message.content) }}
        />
        {!isStreaming && message.content && (
          <MessageActions content={message.content} />
        )}
      </div>
    </div>
  )
}

function MessageActions({ content }: { content: string }) {
  const [thumbUp, setThumbUp] = React.useState(false)
  const [thumbDown, setThumbDown] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  return (
    <div className={styles.msgActions}>
      <button className={styles.msgAct} onClick={() => setThumbUp(true)} style={thumbUp ? { color: 'rgba(255,255,255,0.9)' } : {}}>
        <svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
      </button>
      <button className={styles.msgAct} onClick={() => setThumbDown(true)} style={thumbDown ? { color: 'rgba(255,255,255,0.9)' } : {}}>
        <svg viewBox="0 0 24 24"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
      </button>
      <button
        className={styles.msgAct}
        onClick={() => { navigator.clipboard.writeText(content); setCopied(true) }}
        style={copied ? { color: 'rgba(255,255,255,0.9)' } : {}}
      >
        <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      </button>
    </div>
  )
}
```

- [ ] **Step 7.6: Run all tests — expect PASS**

```bash
npm test
```

- [ ] **Step 7.7: Visual check** — open chat, send a message, verify word-by-word streaming and message layout.

- [ ] **Step 7.8: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement send message, word-by-word streaming, message rendering"
```

---

### Task 8: Clear chat

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 8.1: Add test**

```tsx
it('clears chat when New Chat is clicked', async () => {
  const { container } = render(<ChatBar onSendMessage={async () => 'reply'} />)
  // Open
  fireEvent.click(container.querySelector('[class*="barStrip"]')!)
  // Send a message
  const textarea = screen.getByPlaceholderText('Ask Swisscare Assistant…')
  await userEvent.type(textarea, 'Hello')
  fireEvent.click(screen.getByLabelText('Send'))
  // Wait for firstSent state
  await screen.findByText('Hello')
  // Click New Chat
  fireEvent.click(screen.getByText('New chat'))
  // Welcome screen should be visible again
  expect(container.querySelector('[class*="chatWelcome"]')).toBeInTheDocument()
})
```

- [ ] **Step 8.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

- [ ] **Step 8.3: Implement `clearChat` and "New chat" button**

Add function to `ChatBar`:
```tsx
function clearChat() {
  // Resets conversation state only.
  // privacyMode and retentionOpen are intentionally preserved —
  // they are user preferences for the session, not per-conversation state.
  setMessages([])
  setFirstSent(false)
  setInputValue('')
  setIsBusy(false)
  setStreamingId(null)
  setTimeout(() => topInputRef.current?.focus(), 100)
}
```

Add button to `barOpenSettings`:
```tsx
<button className={styles.chBtn} onClick={e => { e.stopPropagation(); clearChat() }}>
  New chat
</button>
<div className={styles.chDivider} />
```

- [ ] **Step 8.4: Run test — expect PASS**

```bash
npm test
```

- [ ] **Step 8.5: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement clear chat / New chat button"
```

---

### Task 9: Privacy mode

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 9.1: Add test**

```tsx
it('toggles private mode on eye button click', () => {
  const { container } = render(<ChatBar privacyModeEnabled={true} />)
  fireEvent.click(container.querySelector('[class*="barStrip"]')!)
  const eyeBtn = container.querySelector('[data-testid="eye-btn"]')!
  expect(eyeBtn.className).not.toContain('active')
  fireEvent.click(eyeBtn)
  expect(eyeBtn.className).toContain('active')
})
```

- [ ] **Step 9.2: Run test — expect FAIL**

```bash
npm test -- ChatBar.test
```

Expected: FAIL — "Unable to find element with test id: eye-btn"

- [ ] **Step 9.3: Implement privacy toggle**

Add to `barOpenSettings` in `ChatBar.tsx`:
```tsx
{privacyModeEnabled && (
  <button
    className={`${styles.chIconBtn} ${styles.chEyeBtn}${privacyMode ? ` ${styles.active}` : ''}`}
    data-testid="eye-btn"
    onClick={e => { e.stopPropagation(); setPrivacyMode(p => !p) }}
    aria-label="Toggle private mode"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
      {privacyMode && <line x1="3" y1="3" x2="21" y2="21"/>}
    </svg>
  </button>
)}
```

- [ ] **Step 9.4: Run test — expect PASS**

```bash
npm test -- ChatBar.test
```

Expected: PASS

- [ ] **Step 9.5: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement privacy mode toggle"
```

---

### Task 10: Data retention popup + save chat

**Files:**
- Modify: `src/components/ChatBar.tsx`
- Modify: `src/components/ChatBar.test.tsx`

- [ ] **Step 10.1: Add test for retention badge visibility**

```tsx
it('shows retention badge when dataRetentionEnabled is true', () => {
  const { container } = render(<ChatBar dataRetentionEnabled={true} dataRetentionDays={7} />)
  fireEvent.click(container.querySelector('[class*="barStrip"]')!)
  expect(screen.getByText('7 days')).toBeInTheDocument()
})

it('hides retention badge when dataRetentionEnabled is false', () => {
  const { container } = render(<ChatBar dataRetentionEnabled={false} />)
  fireEvent.click(container.querySelector('[class*="barStrip"]')!)
  expect(screen.queryByText(/days/)).not.toBeInTheDocument()
})
```

- [ ] **Step 10.2: Run test — expect FAIL**

- [ ] **Step 10.3: Implement retention badge + popup + save chat**

Add state:
```tsx
const [retentionOpen, setRetentionOpen] = React.useState(false)
const [dataDeleted, setDataDeleted] = React.useState(false)
```

Add to `barOpenSettings`:
```tsx
{dataRetentionEnabled && !privacyMode && (
  <>
    <div className={styles.chDivider} />
    <div
      className={`${styles.chRetention}${retentionOpen ? ` ${styles.active}` : ''}`}
      onClick={e => { e.stopPropagation(); setRetentionOpen(o => !o) }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span className={styles.chRetentionLabel}>{dataRetentionDays} days</span>
    </div>
    <div className={styles.chDivider} />
  </>
)}

{/* Save chat button */}
<button
  className={styles.chIconBtn}
  onClick={e => { e.stopPropagation(); saveChat() }}
  title="Save chat"
  aria-label="Save chat"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
</button>
```

Add retention popup (inside `chatInner`, before closing div):
```tsx
{retentionOpen && (
  <div className={styles.retentionPopup}>
    <div className={styles.retentionPopupTitle}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      Data Retention Policy
    </div>
    <div className={styles.retentionPopupBody}>
      Your conversation is securely stored for <strong>{dataRetentionDays} days</strong>, after which it is automatically and permanently deleted from Swisscare's servers.<br/><br/>
      This limited retention period allows us to ensure service quality and continuously improve the performance of our assistant. No data is ever shared with third parties.
      <br/><br/>If you wish to remove your conversation data immediately, you may do so below.
    </div>
    <button
      className={`${styles.retentionDeleteBtn}${dataDeleted ? ` ${styles.done}` : ''}`}
      onClick={handleDeleteData}
    >
      {dataDeleted ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Data deleted
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
          Delete my data now
        </>
      )}
    </button>
  </div>
)}
```

Add functions:
```tsx
function handleDeleteData() {
  setDataDeleted(true)
  clearChat()
  // Server-side deletion is intentionally out of scope — callers handle this via onSendMessage / their own backend
  setTimeout(() => {
    setRetentionOpen(false)
    setDataDeleted(false)
  }, 1800)
}

function saveChat() {
  const text = messages
    .map(m => (m.role === 'user' ? 'You: ' : `${assistantName}: `) + m.content)
    .join('\n\n')
  if (!text) return
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'swisscare-chat.txt'
  a.click()
}
```

Close popup on outside click:
```tsx
React.useEffect(() => {
  if (!retentionOpen) return
  const close = () => setRetentionOpen(false)
  setTimeout(() => document.addEventListener('click', close), 0)
  return () => document.removeEventListener('click', close)
}, [retentionOpen])
```

- [ ] **Step 10.4: Run all tests — expect PASS**

```bash
npm test
```

- [ ] **Step 10.5: Commit**

```bash
git add src/components/ChatBar.tsx src/components/ChatBar.test.tsx
git commit -m "feat: implement data retention popup, delete data, save chat"
```

---

## Chunk 4: Webflow Registration + Guide

### Task 11: Webflow registration

**Files:**
- Create: `src/components/ChatBar.webflow.tsx`

- [ ] **Step 11.1: Check `@webflow/react` API**

```bash
cat node_modules/@webflow/react/dist/index.d.ts | head -60
```

Look for `declareComponent` and `attr` exports. Confirm import path.

- [ ] **Step 11.2: Create `src/components/ChatBar.webflow.tsx`**

```tsx
import { declareComponent, attr } from '@webflow/react'
import { ChatBar } from './ChatBar'

declareComponent({
  name: 'ChatBar',
  displayName: 'Swisscare Chat Bar',
  props: {
    assistantName: attr.string({
      label: 'Assistant Name',
      defaultValue: 'Swisscare Assistant',
    }),
    welcomeTitle: attr.string({
      label: 'Welcome Title',
      defaultValue: 'How can I help you today?',
    }),
    welcomeSubtitle: attr.string({
      label: 'Welcome Subtitle',
      defaultValue: "Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility.",
    }),
    inputPlaceholder: attr.string({
      label: 'Input Placeholder',
      defaultValue: 'Ask Swisscare Assistant…',
    }),
    inputHint: attr.string({
      label: 'Input Hint',
      defaultValue: 'Official insurance documents always prevail.',
    }),
    sampleQuestions: attr.string({
      label: 'Sample Questions (comma-separated)',
      defaultValue: 'How much cost the insurance in Spain?,Can you help with canton of St-Gallen?,What is a cantonal exemption process?',
    }),
    accentColor: attr.string({
      label: 'Accent Color',
      defaultValue: '#f8ef78',
    }),
    barBackground: attr.string({
      label: 'Bar Background Color',
      defaultValue: '#0e0e0e',
    }),
    chatBackground: attr.string({
      label: 'Chat Background Color',
      defaultValue: '#212121',
    }),
    dataRetentionDays: attr.number({
      label: 'Data Retention Days',
      defaultValue: 7,
    }),
    privacyModeEnabled: attr.boolean({
      label: 'Show Privacy Mode Button',
      defaultValue: true,
    }),
    dataRetentionEnabled: attr.boolean({
      label: 'Show Data Retention Badge',
      defaultValue: true,
    }),
    poweredByText: attr.string({
      label: 'Powered By Text',
      defaultValue: '',
    }),
    poweredByUrl: attr.string({
      label: 'Powered By URL',
      defaultValue: '',
    }),
  },
  // sampleQuestions comes in as comma-separated string from Designer
  // Transform it before passing to ChatBar
  render: (props) => (
    <ChatBar
      {...props}
      sampleQuestions={
        props.sampleQuestions
          ? String(props.sampleQuestions).split(',').map((q: string) => q.trim()).filter(Boolean)
          : undefined
      }
    />
  ),
})
```

> **Note:** If `@webflow/react`'s `declareComponent` API differs from the above, adjust imports and API surface to match what `node_modules/@webflow/react` actually exports. The pattern above is based on Webflow Code Components docs as of early 2026.

- [ ] **Step 11.3: Update `webflow.json` to point to entry file**

```json
{
  "schemaVersion": "1.0.0",
  "displayName": "Swisscare ChatBar",
  "devServerPort": 1337,
  "entryFile": "src/components/ChatBar.webflow.tsx"
}
```

- [ ] **Step 11.4: Verify `webflow.json` is valid**

```bash
cat webflow.json
```

Expected: JSON prints cleanly with `entryFile` pointing to `src/components/ChatBar.webflow.tsx`.

Then verify the entry file exists:

```bash
ls src/components/ChatBar.webflow.tsx
```

Expected: file listed, no "No such file" error.

> Note: `npx webflow dev` requires authentication and a live Webflow Workspace connection, so full CLI startup is validated in the Webflow dev workflow (Task 12 guide). This step confirms configuration is correct before attempting that.

- [ ] **Step 11.5: Commit**

```bash
git add src/components/ChatBar.webflow.tsx webflow.json
git commit -m "feat: add Webflow Code Component registration with all designer props"
```

---

### Task 12: Webflow implementation guide

**Files:**
- Create: `docs/WEBFLOW-GUIDE.md`

- [ ] **Step 12.1: Create `docs/WEBFLOW-GUIDE.md`**

```markdown
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
```

- [ ] **Step 12.2: Commit**

```bash
git add docs/WEBFLOW-GUIDE.md
git commit -m "docs: add Webflow Code Component implementation guide"
```

---

## Final Checklist

- [ ] `npm run dev` — Vite preview works, bar opens/closes, chat sends and streams
- [ ] `npm test` — all tests pass
- [ ] `npm run build` — TypeScript builds without errors
- [ ] `npx webflow dev` — Webflow CLI starts without errors
- [ ] All props editable in Webflow Designer
- [ ] `docs/WEBFLOW-GUIDE.md` covers full publish and install workflow
