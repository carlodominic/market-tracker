import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchCryptoData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CryptoList = () => {
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return <div className="glass-card rounded-lg p-4 sm:p-6 animate-pulse">Loading...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs sm:text-sm text-muted-foreground">
              <th className="pb-3 sm:pb-4">Name</th>
              <th className="pb-3 sm:pb-4">Price</th>
              <th className="pb-3 sm:pb-4 hidden sm:table-cell">24h Change</th>
              <th className="pb-3 sm:pb-4 hidden md:table-cell">Volume</th>
            </tr>
          </thead>
          <tbody>
            {cryptos?.map((crypto) => (
              <tr key={crypto.symbol} className="border-t border-secondary">
                <td className="py-3 sm:py-4">
                  <div className="flex items-center gap-2">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{crypto.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 sm:py-4">
                  <div className="text-sm sm:text-base">${crypto.current_price.toLocaleString()}</div>
                  <div className="sm:hidden">
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-warning"
                      }`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <ArrowUpIcon className="w-2 h-2" />
                      ) : (
                        <ArrowDownIcon className="w-2 h-2" />
                      )}
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 sm:py-4 hidden sm:table-cell">
                  <span
                    className={`flex items-center gap-1 text-sm ${
                      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-warning"
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-3 sm:py-4 hidden md:table-cell text-sm">
                  ${(crypto.total_volume / 1e9).toFixed(1)}B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
