
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useTheme } from './ThemeProvider';

const fetchBitcoinPrices = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
  );
  const data = await response.json();
  
  return data.prices.slice(-30).map(([timestamp, price]: [number, number], index: number) => ({
    date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: Math.round(price),
    day: index
  }));
};

const PortfolioCard = () => {
  const { theme } = useTheme();
  const { data: priceData, isLoading } = useQuery({
    queryKey: ['bitcoinPrices'],
    queryFn: fetchBitcoinPrices,
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="animate-pulse">
          <div className="h-3 sm:h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-6 sm:h-8 bg-muted rounded w-1/2 mb-3 sm:mb-4"></div>
          <div className="h-24 sm:h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const currentPrice = priceData?.[priceData.length - 1]?.price || 0;
  const previousPrice = priceData?.[priceData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Price Display */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
          Bitcoin Price
        </div>
        <div className="text-2xl sm:text-3xl font-bold">
          ${currentPrice.toLocaleString()}
        </div>
        <div className={`flex items-center gap-1 text-xs sm:text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
          {isPositive ? '+' : ''}{priceChangePercent}%
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 sm:h-40 lg:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={8}
              tick={{ fontSize: 8 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={8}
              tick={{ fontSize: 8 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
              itemStyle={{ color: 'hsl(var(--primary))' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#colorPrice)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="text-xs sm:text-sm text-muted-foreground">24h High</div>
          <div className="font-semibold text-green-500 text-sm sm:text-base">
            ${Math.max(...(priceData?.map(d => d.price) || [0])).toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs sm:text-sm text-muted-foreground">24h Low</div>
          <div className="font-semibold text-red-500 text-sm sm:text-base">
            ${Math.min(...(priceData?.map(d => d.price) || [0])).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
