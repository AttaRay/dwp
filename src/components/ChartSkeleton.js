import React from 'react';
import './ChartSkeleton.css';

const ChartSkeleton = ({ height = "300px" }) => {
  return (
    <div className="chart-skeleton" style={{ height }}>
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
      <div className="skeleton-chart-area">
        <div className="skeleton-y-axis">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-line skeleton-axis-label"></div>
          ))}
        </div>
        <div className="skeleton-chart-content">
          <div className="skeleton-chart-bars">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="skeleton-bar" 
                style={{ height: `${Math.random() * 60 + 20}%` }}
              ></div>
            ))}
          </div>
          <div className="skeleton-x-axis">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-line skeleton-axis-label"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSkeleton;