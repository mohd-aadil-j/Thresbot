

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const symbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
];

const StockList: React.FC = () => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const results = await Promise.all(
          symbols.map(async (s) => {
            // Fetch last 30 minutes of price data for chart
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/trade/alpaca/market/${s.symbol}?limit=30`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (!res.ok) throw new Error('Failed to fetch ' + s.symbol);
            const data = await res.json();
            // Alpaca returns bars, get latest price and chart data
            const bars = data[s.symbol] || [];
            const price = bars.length > 0 ? bars[bars.length - 1].c : null;
            const chartData = {
              labels: bars.map((bar: any) => bar.t),
              datasets: [
                {
                  label: `${s.symbol} Price`,
                  data: bars.map((bar: any) => bar.c),
                  borderColor: 'rgba(0, 255, 255, 0.7)',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  tension: 0.2,
                },
              ],
            };
            return { ...s, price, chartData };
          })
        );
        setStockData(results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
    // Optionally, poll every 30s for real-time updates
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="glass-card mb-8 p-6">
        <Typography variant="h4" gutterBottom>Stock List</Typography>
      </div>
      {loading ? (
        <div className="glass-card p-6">Loading...</div>
      ) : error ? (
        <div className="glass-card p-6 text-danger">{error}</div>
      ) : (
        <div className="grid gap-6">
          {stockData.map(stock => (
            <div key={stock.symbol} className="trading-card">
              <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
              <Typography variant="body1">Current Price: ${stock.price ?? 'N/A'}</Typography>
              {stock.chartData && (
                <div style={{ height: 200 }}>
                  <Line data={stock.chartData} options={{
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: true } },
                    maintainAspectRatio: false,
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockList;
