import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TradesTable } from "@/components/trading/TradesTable";
import { AddTradeForm } from "@/components/trading/AddTradeForm";
import { DashboardStats } from "@/components/trading/DashboardStats";
import { SidebarProvider } from "@/components/ui/sidebar";

export interface Trade {
  id: string;
  stockId: string;
  quantity: number;
  targetProfit: number;
  stopLoss: number;
  currentPrice: number;
  entryPrice: number;
  status: 'active' | 'completed' | 'stopped';
  createdAt: string;
}

const Dashboard = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockTrades: Trade[] = [
      {
        id: "1",
        stockId: "AAPL",
        quantity: 100,
        targetProfit: 15.5,
        stopLoss: -8.2,
        currentPrice: 182.50,
        entryPrice: 175.00,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        stockId: "GOOGL",
        quantity: 50,
        targetProfit: 12.3,
        stopLoss: -10.0,
        currentPrice: 2785.40,
        entryPrice: 2650.00,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        stockId: "TSLA",
        quantity: 75,
        targetProfit: 20.0,
        stopLoss: -12.5,
        currentPrice: 248.90,
        entryPrice: 260.00,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setTrades(mockTrades);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddTrade = (newTrade: Omit<Trade, 'id' | 'currentPrice' | 'entryPrice' | 'status' | 'createdAt'>) => {
    const trade: Trade = {
      ...newTrade,
      id: Date.now().toString(),
      currentPrice: Math.random() * 300 + 100, // Mock current price
      entryPrice: Math.random() * 300 + 100,   // Mock entry price
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setTrades(prev => [trade, ...prev]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trading Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage your automated trading strategies
              </p>
            </div>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats trades={trades} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Trades Table */}
            <div className="lg:col-span-2">
              <TradesTable trades={trades} isLoading={isLoading} />
            </div>

            {/* Add Trade Form */}
            <div>
              <AddTradeForm onAddTrade={handleAddTrade} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;