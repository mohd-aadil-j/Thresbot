import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import type { Trade } from "@/pages/Dashboard";

interface DashboardStatsProps {
  trades: Trade[];
}

export function DashboardStats({ trades }: DashboardStatsProps) {
  const calculateStats = () => {
    if (trades.length === 0) {
      return {
        totalValue: 0,
        totalPnL: 0,
        winningTrades: 0,
        averagePnL: 0,
      };
    }

    let totalValue = 0;
    let totalPnL = 0;
    let winningTrades = 0;

    trades.forEach(trade => {
      const value = trade.currentPrice * trade.quantity;
      const pnl = ((trade.currentPrice - trade.entryPrice) / trade.entryPrice) * 100;
      
      totalValue += value;
      totalPnL += pnl;
      
      if (pnl > 0) winningTrades++;
    });

    return {
      totalValue,
      totalPnL,
      winningTrades,
      averagePnL: totalPnL / trades.length,
    };
  };

  const stats = calculateStats();

  const statItems = [
    {
      title: "Total Portfolio Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      title: "Active Trades",
      value: trades.length.toString(),
      icon: Activity,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      title: "Winning Trades",
      value: `${stats.winningTrades}/${trades.length}`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/20",
    },
    {
      title: "Average P&L",
      value: `${stats.averagePnL >= 0 ? '+' : ''}${stats.averagePnL.toFixed(2)}%`,
      icon: stats.averagePnL >= 0 ? TrendingUp : TrendingDown,
      color: stats.averagePnL >= 0 ? "text-success" : "text-danger",
      bgColor: stats.averagePnL >= 0 ? "bg-success/20" : "bg-danger/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {statItems.map((item, index) => (
        <div
          key={item.title}
          className="trading-card hover:scale-105 transition-all duration-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className={`text-2xl font-bold ${item.color} mt-1`}>
                {item.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}