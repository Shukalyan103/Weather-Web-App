import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { AppContext } from './context/AppContext';

// Mock Recharts to avoid jsdom SVG rendering issues
vi.mock('recharts', () => {
  const OriginalRecharts = vi.importActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div>{children}</div>,
    Bar: () => <div>Bar</div>,
    XAxis: () => <div>XAxis</div>,
    YAxis: () => <div>YAxis</div>,
    Tooltip: () => <div>Tooltip</div>,
  };
});

// Mock child components to isolate App component testing
vi.mock('./components/WeatherDisplay', () => ({
  default: () => <div data-testid="weather-display">Weather Display</div>,
}));
vi.mock('./components/WeatherForecaste', () => ({
  default: () => <div data-testid="weather-forecast">Weather Forecast</div>,
}));
vi.mock('./components/WeeklyForcaset', () => ({
  default: () => <div data-testid="weekly-forecast">Weekly Forecast</div>,
}));
vi.mock('./components/Bargraph', () => ({
  default: () => <div data-testid="bar-graph">Bar Graph</div>,
}));
vi.mock('./components/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

describe('App Component', () => {
  const renderWithContext = (contextValues) => {
    return render(
      <AppContext.Provider value={contextValues}>
        <App />
      </AppContext.Provider>
    );
  };

  it('renders loading component when loading is true', () => {
    renderWithContext({ loading: true });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('weather-display')).not.toBeInTheDocument();
  });

  it('renders main layout and child components when loading is false', () => {
    const setInput = vi.fn();
    const setCity = vi.fn();

    renderWithContext({
      loading: false,
      input: '',
      setInput,
      setCity,
      citiesData: []
    });

    // Header
    expect(screen.getByText('Apex Weather')).toBeInTheDocument();

    // Inputs (desktop and mobile)
    const inputs = screen.getAllByPlaceholderText('Search cities');
    expect(inputs).toHaveLength(2);

    // Child components
    expect(screen.getByTestId('weather-display')).toBeInTheDocument();
    expect(screen.getByTestId('weather-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('weekly-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('bar-graph')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('handles input changes and enter key press', async () => {
    const setInput = vi.fn();
    const setCity = vi.fn();

    renderWithContext({
      loading: false,
      input: 'London',
      setInput,
      setCity,
      citiesData: []
    });

    const input = screen.getAllByPlaceholderText('Search cities')[0]; // Desktop input

    // Test input change
    await userEvent.type(input, 'a');
    expect(setInput).toHaveBeenCalled();

    // Test enter key
    await userEvent.keyboard('{Enter}');
    expect(setCity).toHaveBeenCalledWith('London');
  });
});
