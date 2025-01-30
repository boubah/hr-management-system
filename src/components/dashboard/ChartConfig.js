import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const brandColors = {
  primary: '#D62828',
  secondary: '#1A1A1A',
  gray: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  light: '#F3F4F6',
};

export const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        color: brandColors.secondary,
      },
    },
    tooltip: {
      backgroundColor: brandColors.secondary,
      titleFont: {
        family: "'Inter', sans-serif",
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 13,
      },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        color: brandColors.gray,
      },
    },
    y: {
      grid: {
        color: brandColors.light,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        color: brandColors.gray,
      },
    },
  },
};

export const stackedOptions = {
  ...defaultOptions,
  scales: {
    ...defaultOptions.scales,
    x: {
      ...defaultOptions.scales.x,
      stacked: true,
    },
    y: {
      ...defaultOptions.scales.y,
      stacked: true,
    },
  },
};

export const chartColors = {
  primary: [
    brandColors.primary,
    brandColors.info,
    brandColors.success,
    brandColors.warning,
    brandColors.danger,
  ],
  secondary: [
    `${brandColors.primary}80`,
    `${brandColors.info}80`,
    `${brandColors.success}80`,
    `${brandColors.warning}80`,
    `${brandColors.danger}80`,
  ],
};
