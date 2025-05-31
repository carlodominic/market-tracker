
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import ThemeToggle from "@/components/ThemeToggle";
import { TrendingUp, BarChart3, Wallet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4 pt-16 sm:pt-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CryptoSteel
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Your cryptocurrency dashboard for tracking, analyzing, and managing digital assets.
          </p>
        </div>
        
        {/* Market Stats */}
        <div className="mb-8 sm:mb-12">
          <MarketStats />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Chart Section */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Market Analysis</h2>
              </div>
              <CryptoChart />
            </div>
          </div>
          
          {/* Portfolio Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="glass-card p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h2 className="text-lg sm:text-xl font-semibold">Portfolio</h2>
              </div>
              <PortfolioCard />
            </div>
          </div>
        </div>
        
        {/* Crypto List */}
        <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Top Cryptocurrencies
          </h2>
          <CryptoList />
        </div>
      </div>
    </div>
  );
};

export default Index;
