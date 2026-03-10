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
  welcomeTitle: _welcomeTitle = 'How can I help you today?',
  welcomeSubtitle: _welcomeSubtitle = "Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility and make sure you get the support you need.",
  inputPlaceholder: _inputPlaceholder = 'Ask Swisscare Assistant…',
  inputHint: _inputHint = 'Official insurance documents always prevail.',
  sampleQuestions: _sampleQuestions = DEFAULT_QUESTIONS,
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
