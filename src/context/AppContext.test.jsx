import { render, screen, waitFor } from '@testing-library/react';
import { AppContextProvider, AppContext } from './AppContext';
import { useContext } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const TestComponent = () => {
  const { loading } = useContext(AppContext);
  return <div data-testid="loading-state">{loading ? 'Loading' : 'Loaded'}</div>;
};

describe('AppContext getCityLocation Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle fetch errors gracefully and reset loading state', async () => {
    const mockError = new Error('API failure');

    // We mock fetch to reject immediately for the first call (which will be getCityLocation triggered by city='Delhi')
    global.fetch = vi.fn().mockRejectedValue(mockError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    // fetch is called on mount for getCityLocation('Delhi')
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // assert console.error was called with the right arguments
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching weather:', mockError);
    });

    // assert loading is set to false (Loaded text is displayed)
    expect(screen.getByTestId('loading-state')).toHaveTextContent('Loaded');
  });
});
