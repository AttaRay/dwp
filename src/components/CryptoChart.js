import React, { useEffect, useRef, useState } from 'react';

const CryptoChart = ({ symbol }) => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}USDT`,
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: `tradingview_${symbol}`,
          hide_side_toolbar: isMobile,
          hide_top_toolbar: isMobile,
          hide_legend: isMobile,
          studies_overrides: {},
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [symbol, isMobile]);

  const chartHeight = isMobile ? '300px' : '400px';

  return (
    <div 
      ref={container} 
      id={`tradingview_${symbol}`} 
      style={{ 
        width: '100%', 
        height: chartHeight,
        minHeight: isMobile ? '250px' : '350px'
      }} 
    />
  );
};

export default CryptoChart;
