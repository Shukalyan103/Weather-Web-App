import React from 'react';
import { render, waitFor } from '@testing-library/react';
import WeeklyForcaset from '../WeeklyForcaset';
import { AppContext } from '@/context/AppContext';
import { vi } from 'vitest';

describe('WeeklyForcaset', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles invalid data structure gracefully', async () => {
    const mockCoordinates = [40.7128, -74.0060];

    // Mock fetch to return an invalid structure
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        // Missing 'daily' property which is expected
        invalidData: true
      })
    });

    render(
      <AppContext.Provider value={{ coordinates: mockCoordinates }}>
        <WeeklyForcaset />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Invalid data structure:', { invalidData: true });
    });
  });
});
