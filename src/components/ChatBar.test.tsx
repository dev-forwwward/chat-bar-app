import { render, screen, fireEvent } from '@testing-library/react'
import { ChatBar } from './ChatBar'

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
})
