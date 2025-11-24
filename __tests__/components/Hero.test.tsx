import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '../../components/Hero';
import { HeroProps } from '../../types';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Hero Component', () => {
  const mockProps: HeroProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    bgImage: 'https://example.com/test-image.jpg',
  };

  it('renders hero title correctly', () => {
    renderWithRouter(<Hero {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders hero subtitle correctly', () => {
    renderWithRouter(<Hero {...mockProps} />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders hero description when provided', () => {
    renderWithRouter(<Hero {...mockProps} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const propsWithoutDescription = { ...mockProps };
    delete propsWithoutDescription.description;
    renderWithRouter(<Hero {...propsWithoutDescription} />);
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('renders stats when provided', () => {
    const propsWithStats: HeroProps = {
      ...mockProps,
      stats: [
        { value: '30+', label: 'Years' },
        { value: '1000+', label: 'Projects' },
      ],
    };
    renderWithRouter(<Hero {...propsWithStats} />);
    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Years')).toBeInTheDocument();
    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders buttons when provided', () => {
    const propsWithButtons: HeroProps = {
      ...mockProps,
      buttons: [
        { label: 'Get Started', link: '/start', type: 'primary' },
        { label: 'Learn More', link: '/learn', type: 'secondary' },
      ],
    };
    renderWithRouter(<Hero {...propsWithButtons} />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('applies correct overlay gradient for normal type', () => {
    const { container } = renderWithRouter(<Hero {...mockProps} />);
    const section = container.querySelector('section');
    expect(section?.style.backgroundImage).toContain('linear-gradient');
  });

  it('applies dark overlay when overlayType is dark', () => {
    const propsWithDarkOverlay: HeroProps = {
      ...mockProps,
      overlayType: 'dark',
    };
    const { container } = renderWithRouter(<Hero {...propsWithDarkOverlay} />);
    const section = container.querySelector('section');
    expect(section?.style.backgroundImage).toContain('rgba(2, 24, 34, 0.85)');
  });

  it('applies light overlay when overlayType is light', () => {
    const propsWithLightOverlay: HeroProps = {
      ...mockProps,
      overlayType: 'light',
    };
    const { container } = renderWithRouter(<Hero {...propsWithLightOverlay} />);
    const section = container.querySelector('section');
    expect(section?.style.backgroundImage).toContain(
      'rgba(248, 249, 250, 0.85)'
    );
  });

  it('applies correct text color classes based on overlay type', () => {
    const propsWithLightOverlay: HeroProps = {
      ...mockProps,
      overlayType: 'light',
    };
    const { container } = renderWithRouter(<Hero {...propsWithLightOverlay} />);
    const titleContainer = container.querySelector('.max-w-4xl');
    expect(titleContainer?.className).toContain('text-primary');
  });
});
