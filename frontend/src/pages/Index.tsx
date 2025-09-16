import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-glow-pulse delay-1000" />
      </div>

      {/* Hero Content */}
      <div className="trading-card max-w-2xl text-center relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <TrendingUp className="w-12 h-12 text-primary mr-2" />
            <BarChart3 className="w-8 h-8 text-secondary absolute -bottom-1 -right-1" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Trading Bot Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          Monitor and manage your automated trading strategies with real-time insights and elegant controls.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/login')}
          className="btn-neon text-primary-foreground font-semibold px-8 py-4 text-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6 rounded-lg">
            <TrendingUp className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-sm text-muted-foreground">Track your trades with live price updates and performance metrics</p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <BarChart3 className="w-8 h-8 text-secondary mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">Analyze your trading performance with comprehensive charts and data</p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <ArrowRight className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Easy Management</h3>
            <p className="text-sm text-muted-foreground">Effortlessly create and manage your automated trading strategies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
