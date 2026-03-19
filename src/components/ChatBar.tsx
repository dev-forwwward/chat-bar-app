import React from 'react'
import { chatBarStyles } from './ChatBar.styles'
import { NoaIcon } from './NoaIcon';


// Maps any property access to the key itself (e.g. styles.aiBar → 'aiBar').
// This lets the Webflow CLI (webpack, no CSS Modules) and Vite both work
// without changing any className expressions in JSX.
const styles = new Proxy({} as Record<string, string>, {
  get: (_, key: string) => key,
})

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

const DEFAULT_QUESTIONS = [
  'How much cost the insurance in Spain?',
  'Can you help with canton of St-Gallen?',
  'What is a cantonal exemption process?',
]

function RotatingQuestions({ questions }: { questions: string[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (questions.length === 0) return
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
        onClick={() => { navigator.clipboard.writeText(content).catch(() => {}); setCopied(true) }}
        style={copied ? { color: 'rgba(255,255,255,0.9)' } : {}}
      >
        <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      </button>
    </div>
  )
}

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
          // style={{ background: accentColor, color: '#111' } as React.CSSProperties}
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

export function ChatBar({
  assistantName = 'Ask Swisscare Assistant',
  welcomeTitle = 'How can I help you today?',
  welcomeSubtitle = "Instant insurance policy ready for your student visa, university, authorities or any other institution.",
  inputPlaceholder = 'Ask anything',
  inputHint = 'Official insurance documents always prevail.',
  sampleQuestions = DEFAULT_QUESTIONS,
  poweredByText: _poweredByText = '',
  poweredByUrl: _poweredByUrl = '',
  accentColor = '#f8ef78',
  barBackground = '#282828',
  chatBackground = '#282828',
  privacyModeEnabled = true,
  dataRetentionDays = 7,
  dataRetentionEnabled = true,
  onSendMessage,
}: ChatBarProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [firstSent, setFirstSent] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isBusy, setIsBusy] = React.useState(false)
  const [privacyMode, setPrivacyMode] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [streamingId, setStreamingId] = React.useState<string | null>(null)
  const [retentionOpen, setRetentionOpen] = React.useState(false)
  const [dataDeleted, setDataDeleted] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const topInputRef = React.useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const bottomInputRef = React.useRef<HTMLTextAreaElement>(null)
  const streamIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    return () => {
      if (streamIntervalRef.current !== null) clearInterval(streamIntervalRef.current)
    }
  }, [])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleToggle() {
    setIsOpen(prev => !prev)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
      streamIntervalRef.current = setInterval(() => {
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
          if (streamIntervalRef.current !== null) clearInterval(streamIntervalRef.current)
          streamIntervalRef.current = null
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

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => topInputRef.current?.focus(), 500)
    }
  }, [isOpen])

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

  React.useEffect(() => {
    if (!retentionOpen) return
    const close = () => setRetentionOpen(false)
    setTimeout(() => document.addEventListener('click', close), 0)
    return () => document.removeEventListener('click', close)
  }, [retentionOpen])

  React.useEffect(() => {
    if (!mobileMenuOpen) return
    const close = () => setMobileMenuOpen(false)
    setTimeout(() => document.addEventListener('click', close), 0)
    return () => document.removeEventListener('click', close)
  }, [mobileMenuOpen])

  return (
    <div
      id="ai-bar"
      className={`${styles.aiBar}${isOpen ? ` ${styles.open}` : ''}`}
      style={{
        '--accent': accentColor,
        '--bar-bg': barBackground,
        '--chat-bg': chatBackground,
      } as React.CSSProperties}
    >
      <style>{chatBarStyles}</style>
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

        {/* Mobile header — visible only on mobile when open */}
        <div className={styles.mobileHeader}>
          <div className={styles.barOpenName}>
            <NoaIcon />
            {assistantName}
          </div>
          <div className={styles.mobileMenuWrap}>
            <button
              className={styles.mobileMenuBtn}
              onClick={e => { e.stopPropagation(); setMobileMenuOpen(o => !o) }}
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>
            {mobileMenuOpen && (
              <div className={styles.mobileDropdown} onClick={e => e.stopPropagation()}>
                {privacyModeEnabled && (
                  <button className={styles.mobileDropItem} onClick={() => { setPrivacyMode(p => !p); setMobileMenuOpen(false) }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                      {privacyMode && <line x1="3" y1="3" x2="21" y2="21"/>}
                    </svg>
                    Private session
                  </button>
                )}
                {dataRetentionEnabled && !privacyMode && (
                  <button className={styles.mobileDropItem} onClick={() => { setRetentionOpen(o => !o); setMobileMenuOpen(false) }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Data retention policy
                  </button>
                )}
                <button className={styles.mobileDropItem} onClick={() => { saveChat(); setMobileMenuOpen(false) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download chat
                </button>
                <div className={styles.mobileDropDivider} />
                <button className={styles.mobileDropItem} onClick={() => { clearChat(); setMobileMenuOpen(false) }}>
                  New chat
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.chatInner}>
          {/* Welcome state */}
          <div className={`${styles.chatWelcome}${firstSent ? ` ${styles.sticky}` : ''}`}>
            <div className={styles.welcomeTextGroup}>
              <div className={styles.welcomeTitle}>{welcomeTitle}</div>
              <div className={styles.welcomeSub}>{welcomeSubtitle}</div>
            </div>
            {!firstSent && (
              <div className={styles.welcomeInputInner}>
                <div className={`${styles.inputBox}${privacyMode ? ` ${styles.privateMode}` : ''}`}>
                  {privacyMode && <PrivateBadge />}
                  <textarea
                    ref={topInputRef}
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                  <button className={styles.inputSend} onClick={handleSend} disabled={isBusy || !inputValue.trim()} aria-label="Send">
                    <svg viewBox="0 0 16 16"><path d="M8 15V1M8 1L1 8M8 1L15 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <span className={styles.inputHint}>{inputHint}</span>
              </div>
            )}
          </div>

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
          <div className={`${styles.chatInputArea}${!firstSent ? ` ${styles.chatInputHidden}` : ''}`}>
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
                  <svg viewBox="0 0 16 16"><path d="M8 15V1M8 1L1 8M8 1L15 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <span className={styles.inputHint}>{inputHint}</span>
            </div>

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
              <div className={styles.retentionActions}>
                <button
                  className={styles.retentionOkBtn}
                  onClick={e => { e.stopPropagation(); setRetentionOpen(false) }}
                >
                  OK
                </button>
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
                    'Delete data'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar — always visible */}
      <div
        className={`${styles.barStrip} ${styles.auroraOn}`}
      >

        {/* Closed content */}
        <div className={styles.barClosedContent}>
          <div className={styles.barText}>
            <NoaIcon />
            <span className={styles.barTextName}>{assistantName}</span>
            <RotatingQuestions questions={sampleQuestions} />
          </div>
          <button
            className={styles.neoSend}
            onClick={handleToggle}
            aria-label="Open chat"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Open content (settings bar) — rendered inside barStrip when open */}
        <div className={styles.barOpenContent}>
          <div className={styles.barOpenLeft}>
            <NoaIcon />
            <div className={styles.barOpenName}>{assistantName}</div>
          </div>
          <div className={styles.barOpenSettings}>
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
            {dataRetentionEnabled && !privacyMode && (
              <>
                <div
                  className={`${styles.chRetention}${retentionOpen ? ` ${styles.active}` : ''}`}
                  onClick={e => { e.stopPropagation(); setRetentionOpen(o => !o) }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className={styles.chRetentionLabel}>{dataRetentionDays} days</span>
                </div>
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

            <div className={styles.chDivider} />

            {/* New chat button */}
            <button className={styles.chBtn} onClick={e => { e.stopPropagation(); clearChat() }}>
              New chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
