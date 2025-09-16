import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, TrendingUp } from "lucide-react";
import type { Trade } from "@/pages/Dashboard";

interface AddTradeFormProps {
  onAddTrade: (trade: Omit<Trade, 'id' | 'currentPrice' | 'entryPrice' | 'status' | 'createdAt'>) => void;
}

export function AddTradeForm({ onAddTrade }: AddTradeFormProps) {
  const [formData, setFormData] = useState({
    stockId: "",
    quantity: "",
    targetProfit: "",
    stopLoss: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate inputs
      const quantity = parseInt(formData.quantity);
      const targetProfit = parseFloat(formData.targetProfit);
      const stopLoss = parseFloat(formData.stopLoss);

      if (quantity <= 0 || targetProfit <= 0 || stopLoss >= 0) {
        throw new Error('Invalid input values');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In real app, call POST /trade endpoint
      onAddTrade({
        stockId: formData.stockId.toUpperCase(),
        quantity,
        targetProfit,
        stopLoss,
      });

      // Reset form
      setFormData({
        stockId: "",
        quantity: "",
        targetProfit: "",
        stopLoss: "",
      });

      toast({
        title: "Trade Created",
        description: `New trade for ${formData.stockId.toUpperCase()} has been added successfully`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Please check your input values and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="add-trade-form" className="trading-card animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Add New Trade</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stock ID */}
        <div className="space-y-2">
          <Label htmlFor="stockId" className="text-sm font-medium">
            Stock Symbol
          </Label>
          <Input
            id="stockId"
            type="text"
            placeholder="e.g., AAPL, GOOGL"
            value={formData.stockId}
            onChange={(e) => handleInputChange('stockId', e.target.value)}
            className="floating-input uppercase"
            required
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium">
            Quantity (Shares)
          </Label>
          <Input
            id="quantity"
            type="number"
            placeholder="100"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            className="floating-input"
            min="1"
            required
          />
        </div>

        {/* Target Profit */}
        <div className="space-y-2">
          <Label htmlFor="targetProfit" className="text-sm font-medium">
            Target Profit (%)
          </Label>
          <Input
            id="targetProfit"
            type="number"
            placeholder="15.5"
            value={formData.targetProfit}
            onChange={(e) => handleInputChange('targetProfit', e.target.value)}
            className="floating-input"
            step="0.1"
            min="0.1"
            required
          />
        </div>

        {/* Stop Loss */}
        <div className="space-y-2">
          <Label htmlFor="stopLoss" className="text-sm font-medium">
            Stop Loss (%)
          </Label>
          <Input
            id="stopLoss"
            type="number"
            placeholder="-8.5"
            value={formData.stopLoss}
            onChange={(e) => handleInputChange('stopLoss', e.target.value)}
            className="floating-input"
            step="0.1"
            max="-0.1"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-neon w-full text-primary-foreground font-semibold"
        >
          {isSubmitting ? (
            "Creating Trade..."
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Create Trade
            </>
          )}
        </Button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Stop loss should be negative (e.g., -8.5%) and target profit should be positive (e.g., 15.5%)
        </p>
      </div>
    </div>
  );
}