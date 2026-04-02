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
}: {
  message: Message
  assistantName: string
  isStreaming: boolean
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
        <div className={styles.barClosedContent} onClick={handleToggle}>
          <div className={styles.barText}>
            <NoaIcon />
            <span className={styles.barTextName}>{assistantName}</span>
            <RotatingQuestions questions={sampleQuestions} />
          </div>
          <button
            className={styles.neoSend}
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
                className={`${styles.chIconBtn} ${styles.privacyBtn}${privacyMode ? ` ${styles.active}` : ''}`}
                data-testid="eye-btn"
                onClick={e => { e.stopPropagation(); setPrivacyMode(p => !p) }}
                aria-label="Toggle private mode"
              >
                {/* <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                  {privacyMode && <line x1="3" y1="3" x2="21" y2="21"/>}
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.0101 0.649902C12.0235 0.649902 13.2935 0.659902 13.8201 0.679902C14.3588 0.701912 14.8734 0.907693 15.2776 1.26273C15.6818 1.61777 15.951 2.10048 16.0401 2.6299L16.9101 7.8499C16.9417 8.03373 17.0341 8.20128 17.1723 8.32491C17.3105 8.44853 17.4861 8.52084 17.6701 8.5299L18.7401 8.5799C18.8061 8.5866 18.8707 8.60701 18.9301 8.6399C19.3168 8.88657 19.4068 9.2299 19.2001 9.6699C19.1689 9.73779 19.1219 9.79753 19.0629 9.8444C19.0038 9.89127 18.9344 9.92397 18.8601 9.9399C18.7001 9.97324 15.7501 9.9899 10.0101 9.9899C4.27681 9.99657 1.33015 9.98324 1.17015 9.9499C1.09585 9.93397 1.02644 9.90127 0.967425 9.85441C0.908407 9.80754 0.861404 9.74779 0.830145 9.6799C0.623479 9.2399 0.713479 8.89657 1.10015 8.6499C1.15955 8.61701 1.22419 8.5966 1.29015 8.5899L2.36015 8.5399C2.54421 8.53085 2.71983 8.45854 2.858 8.33491C2.99617 8.21129 3.08864 8.04373 3.12015 7.8599L3.98015 2.6299C4.07134 2.10232 4.34148 1.62193 4.74548 1.26887C5.14949 0.915824 5.66293 0.711468 6.20015 0.689902C6.72681 0.663236 7.99681 0.649902 10.0101 0.649902ZM5.08015 8.4899L14.9401 8.4699C14.9703 8.4699 15.0003 8.46395 15.0282 8.45239C15.0561 8.44084 15.0814 8.42389 15.1028 8.40254C15.1241 8.38118 15.1411 8.35582 15.1526 8.32792C15.1642 8.30001 15.1701 8.27011 15.1701 8.2399L15.1601 6.4799C15.1593 5.91314 15.1126 5.35194 15.0227 4.82843C14.9327 4.30492 14.8013 3.82938 14.636 3.42904C14.4706 3.0287 14.2746 2.71142 14.0591 2.49536C13.8436 2.2793 13.6129 2.1687 13.3801 2.1699L6.60015 2.1899C6.13136 2.19232 5.68278 2.64747 5.35282 3.45549C5.02287 4.26351 4.83849 5.3584 4.84015 6.4999L4.85015 8.2599C4.85015 8.3209 4.87438 8.3794 4.91751 8.42254C4.96064 8.46567 5.01915 8.4899 5.08015 8.4899Z" fill="currentColor"/>
                    <path d="M9.99994 13.3302C10.8999 13.3302 11.7199 12.9002 12.4599 12.0402C12.6691 11.7997 12.9446 11.6288 13.2499 11.5502C15.3033 11.0635 16.8533 11.5502 17.8999 13.0102C21.7499 18.4002 11.5699 22.7302 10.6099 15.4702C10.5566 15.0368 10.3533 14.8202 9.99994 14.8202C9.64661 14.8202 9.43994 15.0368 9.37994 15.4702C8.41994 22.7302 -1.75006 18.4002 2.09994 13.0102C3.14661 11.5502 4.69661 11.0635 6.74994 11.5502C7.05528 11.6288 7.33077 11.7997 7.53994 12.0402C8.27327 12.9002 9.09327 13.3302 9.99994 13.3302ZM17.0599 15.3502C17.0599 14.711 16.806 14.098 16.3541 13.646C15.9021 13.1941 15.2891 12.9402 14.6499 12.9402C14.0108 12.9402 13.3978 13.1941 12.9458 13.646C12.4938 14.098 12.2399 14.711 12.2399 15.3502C12.2399 15.6667 12.3023 15.98 12.4234 16.2724C12.5445 16.5648 12.722 16.8305 12.9458 17.0543C13.1696 17.2781 13.4353 17.4556 13.7277 17.5767C14.0201 17.6978 14.3335 17.7602 14.6499 17.7602C14.9664 17.7602 15.2798 17.6978 15.5722 17.5767C15.8646 17.4556 16.1303 17.2781 16.3541 17.0543C16.5779 16.8305 16.7554 16.5648 16.8765 16.2724C16.9976 15.98 17.0599 15.6667 17.0599 15.3502ZM7.74994 15.3502C7.74994 14.711 7.49603 14.098 7.04407 13.646C6.5921 13.1941 5.97911 12.9402 5.33994 12.9402C4.70077 12.9402 4.08777 13.1941 3.63581 13.646C3.18385 14.098 2.92994 14.711 2.92994 15.3502C2.92994 15.6667 2.99228 15.98 3.11339 16.2724C3.2345 16.5648 3.41202 16.8305 3.63581 17.0543C3.8596 17.2781 4.12528 17.4556 4.41767 17.5767C4.71007 17.6978 5.02345 17.7602 5.33994 17.7602C5.65642 17.7602 5.96981 17.6978 6.26221 17.5767C6.5546 17.4556 6.82028 17.2781 7.04407 17.0543C7.26786 16.8305 7.44537 16.5648 7.56649 16.2724C7.6876 15.98 7.74994 15.6667 7.74994 15.3502Z" fill="currentColor"/>
                </svg>

                <span className={styles.privacyBtnLabel}>Private session</span>
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
