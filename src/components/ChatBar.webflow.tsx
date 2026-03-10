import React from 'react'
import { declareComponent } from '@webflow/react'
import { props } from '@webflow/data-types'
import { ChatBar } from './ChatBar'

// Webflow Designer passes sampleQuestions as a plain string (comma-separated).
// This wrapper splits it into string[] before handing off to ChatBar.
interface WebflowChatBarProps {
  assistantName?: string
  welcomeTitle?: string
  welcomeSubtitle?: string
  inputPlaceholder?: string
  inputHint?: string
  sampleQuestions?: string
  accentColor?: string
  barBackground?: string
  chatBackground?: string
  dataRetentionDays?: number
  privacyModeEnabled?: boolean
  dataRetentionEnabled?: boolean
  poweredByText?: string
  poweredByUrl?: string
}

function WebflowChatBar({
  sampleQuestions,
  ...rest
}: WebflowChatBarProps) {
  const parsedQuestions = sampleQuestions
    ? String(sampleQuestions).split(',').map((q: string) => q.trim()).filter(Boolean)
    : undefined

  return <ChatBar {...rest} sampleQuestions={parsedQuestions} />
}

export default declareComponent(WebflowChatBar, {
  name: 'Swisscare Chat Bar',
  props: {
    assistantName: props.Text({
      name: 'Assistant Name',
      defaultValue: 'Swisscare Assistant',
    }),
    welcomeTitle: props.Text({
      name: 'Welcome Title',
      defaultValue: 'How can I help you today?',
    }),
    welcomeSubtitle: props.Text({
      name: 'Welcome Subtitle',
      defaultValue:
        "Need help with your Swisscare plan? I'm here to answer your questions about coverage, options, or eligibility.",
    }),
    inputPlaceholder: props.Text({
      name: 'Input Placeholder',
      defaultValue: 'Ask Swisscare Assistant…',
    }),
    inputHint: props.Text({
      name: 'Input Hint',
      defaultValue: 'Official insurance documents always prevail.',
    }),
    sampleQuestions: props.Text({
      name: 'Sample Questions (comma-separated)',
      defaultValue:
        'How much cost the insurance in Spain?,Can you help with canton of St-Gallen?,What is a cantonal exemption process?',
    }),
    accentColor: props.Text({
      name: 'Accent Color',
      defaultValue: '#f8ef78',
    }),
    barBackground: props.Text({
      name: 'Bar Background Color',
      defaultValue: '#0e0e0e',
    }),
    chatBackground: props.Text({
      name: 'Chat Background Color',
      defaultValue: '#212121',
    }),
    dataRetentionDays: props.Number({
      name: 'Data Retention Days',
      defaultValue: 7,
    }),
    privacyModeEnabled: props.Boolean({
      name: 'Show Privacy Mode Button',
      defaultValue: true,
    }),
    dataRetentionEnabled: props.Boolean({
      name: 'Show Data Retention Badge',
      defaultValue: true,
    }),
    poweredByText: props.Text({
      name: 'Powered By Text',
      defaultValue: '',
    }),
    poweredByUrl: props.Text({
      name: 'Powered By URL',
      defaultValue: '',
    }),
  },
})
