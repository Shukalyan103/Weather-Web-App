import { render, act } from '@testing-library/react';
import { AppContext } from '@/context/AppContext';
import Chart from './Chart';
import { vi } from 'vitest';

// Mock Recharts to avoid issues with rendering SVG elements in jsdom
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Cell: () => <div data-testid="cell" />,
  };
});

// Mock linearGradient, defs, and stop which jsdom might complain about
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return actual;
});

describe('Chart Component', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn();
    // Suppress console.error about unrecognized tags for cleaner test output
    vi.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('is unrecognized in this browser') || msg.includes('is using incorrect casing')) {
        return;
      }
      console.error(msg);
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should not fetch data when lat and lon are missing', async () => {
    const mockContextValue = {
      openweatherapiKey: 'test-api-key',
      citiesData: {
        location: null // Missing lat/lon
      }
    };

    await act(async () => {
      render(
        <AppContext.Provider value={mockContextValue}>
          <Chart />
        </AppContext.Provider>
      );
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should fetch data when lat and lon are present', async () => {
    const mockContextValue = {
      openweatherapiKey: 'test-api-key',
      citiesData: {
        location: {
          lat: 10,
          lon: 20
        }
      }
    };

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ list: [] })
    });

    await act(async () => {
      render(
        <AppContext.Provider value={mockContextValue}>
          <Chart />
        </AppContext.Provider>
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/forecast?lat=10&lon=20&appid=test-api-key&units=metric'
    );
  });
});
