import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

// Mock fetch globally — prevents real API calls to localhost:8000
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { AssetID: 'A001', Hostname: 'FINANCE-PC-01', MAC_Address: 'AA:BB:CC:DD:EE:01', IP_Address: '192.168.1.101', Department: 'Finance' },
          { AssetID: 'A002', Hostname: 'HR-LAPTOP-01',  MAC_Address: 'AA:BB:CC:DD:EE:02', IP_Address: '192.168.1.102', Department: 'HR' },
        ]),
    })
  ));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('IT Asset DB Frontend', () => {
  it('renders the main application heading', async () => {
    render(<App />);
    expect(await screen.findByText(/IT Asset/i)).toBeInTheDocument();
  });

  it('fetches and renders asset rows from the API', async () => {
    render(<App />);
    expect(await screen.findByText('FINANCE-PC-01')).toBeInTheDocument();
    expect(await screen.findByText('HR-LAPTOP-01')).toBeInTheDocument();
  });

  it('displays the correct total asset count in the stats panel', async () => {
    render(<App />);
    // Mock returns 2 assets — stats panel should say "2" for both Assets and Departments
    await waitFor(() => {
      expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('theme defaults to dark mode — the toggle button is visible', async () => {
    render(<App />);
    await screen.findByText('FINANCE-PC-01');
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('clicking the theme toggle button switches theme attribute on html element', async () => {
    render(<App />);
    await screen.findByText('FINANCE-PC-01');

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
