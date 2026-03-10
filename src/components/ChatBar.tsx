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
        onClick={() => { navigator.clipboard.writeText(content); setCopied(true) }}
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

export function ChatBar({
  assistantName = 'Swisscare Assistant',
  welcomeTitle = 'How can I help you today?',
  welcomeSubtitle = "Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility and make sure you get the support you need.",
  inputPlaceholder = 'Ask Swisscare Assistant…',
  inputHint = 'Official insurance documents always prevail.',
  sampleQuestions = DEFAULT_QUESTIONS,
  poweredByText: _poweredByText = '',
  poweredByUrl: _poweredByUrl = '',
  accentColor = '#f8ef78',
  barBackground = '#0e0e0e',
  chatBackground = '#212121',
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const bottomInputRef = React.useRef<HTMLTextAreaElement>(null)

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

  const topInputRef = React.useRef<HTMLTextAreaElement>(null)
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
        </div>
      </div>

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
            <button className={styles.chBtn} onClick={e => { e.stopPropagation(); clearChat() }}>
              New chat
            </button>
            <div className={styles.chDivider} />
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
          </div>
        </div>
      </div>
    </div>
  )
}
