import React from 'react';
import './MRRPercentageChart.css';

const MRRPercentageChart = ({ data }) => {
  const percentage = data.percentage || 0;
  const isPositive = percentage >= 0;
  const strokeColor = isPositive ? '#2e7d32' : '#c62828';
  const iconClass = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-chart">
      <div className="progress-circle">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-circle-bg"
            stroke="#f0f0f0"
            strokeWidth="8"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
          />
          <circle
            className="progress-ring-circle"
            stroke={strokeColor}
            strokeWidth="8"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="progress-text">
          <div className="chart-title">MRR Growth</div>
          <div className={`percentage-display ${isPositive ? 'positive' : 'negative'}`}>
            <i className={iconClass} aria-hidden="true" />
            <span>{Math.abs(percentage)}%</span>
          </div>
          <div className="current-value">{data.currentValue}</div>
          <div className="current-label">{data.currentLabel}</div>
          <div className="previous-value">{data.previousValue}</div>
          <div className="previous-label">{data.previousLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default MRRPercentageChart;
