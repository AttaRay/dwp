import React from 'react';
import './ChartEmptyState.css';

const ChartEmptyState = ({ title, message, icon, height = "300px" }) => {
  return (
    <div className="chart-empty-state" style={{ height }}>
      <div className="empty-state-content">
        {icon && <div className="empty-state-icon">{icon}</div>}
        <h4 className="empty-state-title">{title}</h4>
        <p className="empty-state-message">{message}</p>
      </div>
    </div>
  );
};

export default ChartEmptyState;