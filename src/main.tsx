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
