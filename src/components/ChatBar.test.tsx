import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatBar, formatText, escapeHtml } from './ChatBar'

describe('ChatBar', () => {
  it('renders without crashing', () => {
    render(<ChatBar />)
    // The closed bar should always be in the DOM
    expect(document.getElementById('ai-bar')).toBeInTheDocument()
  })

  it('shows assistantName in closed bar', () => {
    render(<ChatBar assistantName="Test Assistant" />)
    const matches = screen.getAllByText('Test Assistant')
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

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

  it('toggles private mode on eye button click', () => {
    const { container } = render(<ChatBar privacyModeEnabled={true} />)
    fireEvent.click(container.querySelector('[class*="barStrip"]')!)
    const eyeBtn = container.querySelector('[data-testid="eye-btn"]')!
    expect(eyeBtn.className).not.toContain('active')
    fireEvent.click(eyeBtn)
    expect(eyeBtn.className).toContain('active')
  })

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
    // Welcome screen should be visible again (welcomeTitle text)
    expect(screen.getByText('How can I help you today?')).toBeInTheDocument()
  })
})

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
