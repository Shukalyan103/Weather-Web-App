import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Chart from './Chart';
import { AppContext } from '@/context/AppContext';

vi.mock('recharts', async () => {
  const OriginalRechartsModule = await vi.importActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Cell: () => <div data-testid="cell" />,
  };
});

describe('Chart Component Error Handling', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should log an error when the fetch request fails', async () => {
    const errorMsg = 'API failure';
    const mockFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMsg));
    const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockCitiesData = {
      location: {
        lat: 12.34,
        lon: 56.78,
      },
    };

    render(
      <AppContext.Provider value={{ citiesData: mockCitiesData, openweatherapiKey: 'test-key' }}>
        <Chart />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith('Error fetching graph data:', expect.any(Error));
    });

    mockFetch.mockRestore();
    mockConsoleError.mockRestore();
  });
});
