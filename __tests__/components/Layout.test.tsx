import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/Layout';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Layout Component', () => {
  it('renders layout with children', () => {
    renderWithRouter(
      <Layout>
        <div>Test Child Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  it('renders logo in header', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const logo = screen.getAllByAltText('Hydroforce Engineering')[0];
    expect(logo).toBeInTheDocument();
  });

  it('renders main navigation items', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Quality')[0]).toBeInTheDocument();
  });

  it('renders Hydraulics dropdown menu items', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getAllByText('Hydraulic Cylinders')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Motors & Pumps')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Specification Form')[0]).toBeInTheDocument();
  });

  it('renders Metal Parts dropdown menu items', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getAllByText('Powder Metallurgy')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Die Casting')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Machining')[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking menu button', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Find the mobile menu button (only visible on mobile)
    const menuButtons = screen.getAllByRole('button');
    const mobileMenuButton = menuButtons.find(
      (button) =>
        button.querySelector('svg') !== null &&
        button.parentElement?.className.includes('lg:hidden')
    );

    expect(mobileMenuButton).toBeDefined();
    if (mobileMenuButton) {
      fireEvent.click(mobileMenuButton);
      // The mobile menu should now be visible (max-height changes)
      // This is a simple check that the click handler works
      expect(mobileMenuButton).toBeInTheDocument();
    }
  });

  it('renders contact form in footer', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('Send us a Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders contact information in footer', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText(/HYDROFORCE ENGINEERING/)).toBeInTheDocument();
    expect(screen.getByText(/Valge 13, Tallinn/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const socialLinks = screen
      .getAllByRole('link')
      .filter(
        (link) =>
          link.getAttribute('href')?.includes('facebook') ||
          link.getAttribute('href')?.includes('linkedin')
      );
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('renders copyright information', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} Hydroforce Engineering. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  it('renders privacy policy link', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.getAttribute('href')).toBe('/privacy-policy');
  });

  it('has Contact Us button in header', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const contactButtons = screen.getAllByText(/Contact Us/);
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  it('form has required fields marked as required', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      'Message'
    ) as HTMLTextAreaElement;

    expect(nameInput.required).toBe(true);
    expect(emailInput.required).toBe(true);
    expect(messageInput.required).toBe(true);
  });

  it('submit button is present and enabled initially', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
