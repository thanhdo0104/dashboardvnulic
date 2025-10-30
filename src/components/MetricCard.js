import React, { useState, useEffect } from 'react';
import './MetricCard.css';

const MetricCard = ({ metric, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate API call or action
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className={`metric-card ${metric.color} ${isVisible ? 'fade-in-up' : ''} ${isLoading ? 'loading' : ''}`}
      style={{ '--delay': `${delay}s` }}
      onClick={handleClick}
    >
      <div className="metric-icon">
        <i className={metric.icon}></i>
      </div>
      <div className="metric-value">
        {metric.value}
        {isLoading && <div className="loading-spinner small"></div>}
      </div>
      <div className="metric-label">{metric.title}</div>
      {metric.trend && (
        <div className={`metric-trend ${metric.trend.startsWith('+') ? 'positive' : 'negative'}`}>
          {metric.trend}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
