import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import About from '@/components/About';
import Services from '@/components/Services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider';
import { defaultAboutData, defaultServicesData, defaultHeaderData, defaultFooterData } from '@/data/defaults';

// Helper to prime localStorage with possibly malformed JSON shape
function setLS(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

describe('Defensive rendering of persisted-data components', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('About component tolerates missing/invalid values array', () => {
    setLS('aboutData', { title: 'Custom Title', values: null });
    render(<MemoryRouter><About /></MemoryRouter>);
    // Title should render from stored value
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    // A default value title should appear proving fallback array used
    expect(screen.getByText(defaultAboutData.values[0].title)).toBeInTheDocument();
  });

  it('Services component tolerates null services list', () => {
    setLS('servicesData', { title: 'Svc', subtitle: 'Sub', services: null });
    render(<MemoryRouter><Services /></MemoryRouter>);
    expect(screen.getByText('Svc')).toBeInTheDocument();
    // One of default service titles present
    expect(screen.getByText(defaultServicesData.services[0].title)).toBeInTheDocument();
  });

  it('Header component tolerates navigationItems set to null', () => {
    setLS('headerData', { ...defaultHeaderData, navigationItems: null });
  render(<MemoryRouter><AuthProvider><Header /></AuthProvider></MemoryRouter>);
    // Logo always present
    expect(screen.getByText(defaultHeaderData.logoText)).toBeInTheDocument();
    // Fallback nav item from defaults (e.g. Services) should still render
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('Footer component tolerates arrays replaced by non-arrays', () => {
    setLS('footerData', { ...defaultFooterData, socials: null, columns: null, bottomLinks: null });
  render(<MemoryRouter><Footer /></MemoryRouter>);
    // Logo text present
    expect(screen.getByText(defaultFooterData.logoText)).toBeInTheDocument();
    // One default column link text should render
    expect(screen.getByText('Ocean Freight')).toBeInTheDocument();
  });
});
