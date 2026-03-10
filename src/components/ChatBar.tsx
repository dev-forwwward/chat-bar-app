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
  privacyModeEnabled: _privacyModeEnabled = true,
  dataRetentionDays: _dataRetentionDays = 7,
  dataRetentionEnabled: _dataRetentionEnabled = true,
  onSendMessage: _onSendMessage,
}: ChatBarProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [firstSent, setFirstSent] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isBusy, setIsBusy] = React.useState(false)
  const [privacyMode, setPrivacyMode] = React.useState(false)

  function handleToggle() {
    setIsOpen(prev => !prev)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleSend() {
    // Implemented in Task 7. The Send button is visible but non-functional at this stage — expected.
  }

  const topInputRef = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => topInputRef.current?.focus(), 500)
    }
  }, [isOpen])

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
            {/* Settings controls added in Tasks 8–10 */}
          </div>
        </div>
      </div>
    </div>
  )
}
