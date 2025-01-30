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

// Register ChartJS components
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

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 12
        }
      }
    }
  }
};

export const barOptions = {
  ...defaultOptions,
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1
      }
    }
  }
};

export const doughnutOptions = {
  ...defaultOptions,
  cutout: '60%'
};
