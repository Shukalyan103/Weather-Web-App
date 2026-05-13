import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { AppContext } from './context/AppContext';

// Mock recharts to bypass SVG rendering issues in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

// Mock internal components to simplify testing
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
  default: () => <div data-testid="bargraph">Bargraph</div>,
}));
vi.mock('./components/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

describe('App component', () => {
  let mockContextValue;

  beforeEach(() => {
    mockContextValue = {
      setCity: vi.fn(),
      input: '',
      setInput: vi.fn(),
      citiesData: {},
      loading: false,
    };
  });

  it('renders correctly', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );
    expect(screen.getByText('Apex Weather')).toBeInTheDocument();
  });

  it('calls setCity when Enter key is pressed in the search input', () => {
    // Setup initial context input to simulate user typing 'London'
    mockContextValue.input = 'London';

    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );

    // Get the desktop input (it's the first one in the DOM)
    const inputs = screen.getAllByPlaceholderText('Search cities');
    const desktopInput = inputs[0];

    // Simulate Enter key press
    fireEvent.keyDown(desktopInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Assert setCity was called with 'London'
    expect(mockContextValue.setCity).toHaveBeenCalledTimes(1);
    expect(mockContextValue.setCity).toHaveBeenCalledWith('London');
  });

  it('updates input value on change', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );

    const inputs = screen.getAllByPlaceholderText('Search cities');
    const desktopInput = inputs[0];

    // Simulate typing 'Paris'
    fireEvent.change(desktopInput, { target: { value: 'Paris' } });

    // Assert setInput was called with 'Paris'
    expect(mockContextValue.setInput).toHaveBeenCalledTimes(1);
    expect(mockContextValue.setInput).toHaveBeenCalledWith('Paris');
  });

  it('does not call setCity when other keys are pressed', () => {
    mockContextValue.input = 'Tokyo';

    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );

    const inputs = screen.getAllByPlaceholderText('Search cities');
    const desktopInput = inputs[0];

    // Simulate 'A' key press
    fireEvent.keyDown(desktopInput, { key: 'A', code: 'KeyA', charCode: 65 });

    // Assert setCity was NOT called
    expect(mockContextValue.setCity).not.toHaveBeenCalled();
  });
});
