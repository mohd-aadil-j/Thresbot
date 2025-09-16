import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Trade } from "@/pages/Dashboard";

interface TradesTableProps {
  trades: Trade[];
  isLoading: boolean;
}

export function TradesTable({ trades, isLoading }: TradesTableProps) {
  const calculatePnL = (trade: Trade) => {
    const pnl = ((trade.currentPrice - trade.entryPrice) / trade.entryPrice) * 100;
    return pnl;
  };

  const getPnLColor = (pnl: number) => {
    return pnl >= 0 ? "text-success" : "text-danger";
  };

  if (isLoading) {
    return (
      <div className="trading-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Active Trades</h2>
          <Skeleton className="w-20 h-6" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="trading-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Active Trades</h2>
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          {trades.length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {trades.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No active trades yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first trade to get started</p>
          </div>
        ) : (
          trades.map((trade) => {
            const pnl = calculatePnL(trade);
            return (
              <div
                key={trade.id}
                className="glass-card p-4 rounded-lg hover:bg-card-glass/50 transition-all duration-200"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                  {/* Stock Symbol */}
                  <div>
                    <p className="font-semibold text-primary text-lg">{trade.stockId}</p>
                    <p className="text-xs text-muted-foreground">{trade.quantity} shares</p>
                  </div>

                  {/* Current Price */}
                  <div className="text-right md:text-center">
                    <p className="font-medium">${trade.currentPrice.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>

                  {/* P&L */}
                  <div className="text-right md:text-center">
                    <div className={`flex items-center justify-end md:justify-center gap-1 ${getPnLColor(pnl)}`}>
                      {pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="font-medium">{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">P&L</p>
                  </div>

                  {/* Target Profit */}
                  <div className="text-right md:text-center">
                    <p className="font-medium text-success">+{trade.targetProfit}%</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>

                  {/* Stop Loss */}
                  <div className="text-right md:text-center">
                    <p className="font-medium text-danger">{trade.stopLoss}%</p>
                    <p className="text-xs text-muted-foreground">Stop Loss</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex justify-between items-center">
                  <Badge 
                    variant={trade.status === 'active' ? 'default' : 'secondary'}
                    className={trade.status === 'active' ? 'bg-success/20 text-success' : ''}
                  >
                    {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Entry: ${trade.entryPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}