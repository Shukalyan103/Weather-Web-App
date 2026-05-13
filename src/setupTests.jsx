import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('recharts', () => {
    return {
        ResponsiveContainer: ({ children }) => <div>{children}</div>,
        BarChart: ({ children }) => <div>{children}</div>,
        Bar: () => <div>Bar</div>,
        XAxis: () => <div>XAxis</div>,
        YAxis: () => <div>YAxis</div>,
        CartesianGrid: () => <div>CartesianGrid</div>,
        Tooltip: () => <div>Tooltip</div>,
        Legend: () => <div>Legend</div>,
    }
});
