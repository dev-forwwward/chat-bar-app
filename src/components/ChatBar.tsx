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

export function ChatBar({
  assistantName = 'Swisscare Assistant',
  welcomeTitle: _welcomeTitle = 'How can I help you today?',
  welcomeSubtitle: _welcomeSubtitle = "Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility and make sure you get the support you need.",
  inputPlaceholder: _inputPlaceholder = 'Ask Swisscare Assistant…',
  inputHint: _inputHint = 'Official insurance documents always prevail.',
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
  function handleToggle() {
    setIsOpen(prev => !prev)
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
