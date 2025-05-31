import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { useTheme } from "./ThemeProvider";

const CryptoChart = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <div 
        className="w-full rounded-lg overflow-hidden border border-border/50" 
        style={{ height: "500px" }}
      >
        <AdvancedChart
          widgetProps={{
            symbol: "BINANCE:BTCUSDT",
            theme: theme === "dark" ? "dark" : "light",
            locale: "en",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            interval: "D",
            toolbar_bg: theme === "dark" ? "#0a0a0a" : "#ffffff",
            enable_publishing: false,
            hide_top_toolbar: false,
            save_image: false,
            container_id: "tradingview_chart",
          }}
        />
      </div>
    </div>
  );
};

export default CryptoChart;