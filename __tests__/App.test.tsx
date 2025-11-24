import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check if Layout component is rendered (logo should be present)
    const logos = screen.getAllByAlt('Hydroforce Engineering');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders navigation elements', () => {
    render(<App />);
    // Check for navigation items from Layout
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });

  it('renders footer with contact information', () => {
    render(<App />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('has proper routing structure', () => {
    render(<App />);
    // App should render with Layout, which contains header and footer
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(
      screen.getByText(/HYDROFORCE ENGINEERING/)
    ).toBeInTheDocument();
  });
});
