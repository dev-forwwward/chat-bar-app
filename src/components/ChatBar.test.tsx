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
    expect(screen.getByText('Test Assistant')).toBeInTheDocument()
  })
})
