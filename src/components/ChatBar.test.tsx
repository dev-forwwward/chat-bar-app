import { render, screen } from '@testing-library/react'
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
})
