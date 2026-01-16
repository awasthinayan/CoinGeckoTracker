import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurrencyContext } from "../Context/ContextProvider";
import { fetchCoinForComparison, compareCoinMetrics, formatCurrencyValue, getBetterValue } from "../Services/CompareCoins";
import Alert from "../Error_Alert/Alert";

const Compare = () => {
  const { currency } = useContext(CurrencyContext);
  const [coin1Id, setCoin1Id] = useState(null);
  const [coin2Id, setCoin2Id] = useState(null);
  const [allCoins, setAllCoins] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState(false);

  // Fetch all coins for selection
  React.useEffect(() => {
    const fetchAllCoins = async () => {
      setLoadingCoins(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1`
        );
        const data = await response.json();
        setAllCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoadingCoins(false);
      }
    };

    fetchAllCoins();
  }, [currency]);

  // Fetch coin 1 details
  const { data: coin1, isLoading: loading1, isError: error1 } = useQuery({
    queryKey: ["compare-coin", coin1Id],
    queryFn: () => fetchCoinForComparison(coin1Id),
    enabled: !!coin1Id,
    staleTime: 1000 * 60 * 2,
  });

  // Fetch coin 2 details
  const { data: coin2, isLoading: loading2, isError: error2 } = useQuery({
    queryKey: ["compare-coin", coin2Id],
    queryFn: () => fetchCoinForComparison(coin2Id),
    enabled: !!coin2Id,
    staleTime: 1000 * 60 * 2,
  });

  const isLoading = loading1 || loading2 || loadingCoins;
  const comparison = coin1 && coin2 ? compareCoinMetrics(coin1, coin2, currency) : null;

  const MetricRow = ({ label, metric, higherIsBetter = true }) => {
    if (!comparison) return null;
    const val1 = comparison.coin1[metric];
    const val2 = comparison.coin2[metric];
    const better = getBetterValue(val1, val2, higherIsBetter);

    return (
      <div className="border-b border-gray-300 py-4 px-4">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className={`text-center ${better === 'coin1' ? 'bg-green-50 rounded-lg p-2' : ''}`}>
            <p className="font-semibold">{val1 ? (typeof val1 === 'number' && val1 > 100 ? formatCurrencyValue(val1) : val1.toFixed(2)) : 'N/A'}</p>
          </div>
          <div className="text-center text-gray-600 font-semibold">{label}</div>
          <div className={`text-center ${better === 'coin2' ? 'bg-green-50 rounded-lg p-2' : ''}`}>
            <p className="font-semibold">{val2 ? (typeof val2 === 'number' && val2 > 100 ? formatCurrencyValue(val2) : val2.toFixed(2)) : 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Compare Crypto Currencies</h1>

      {/* Coin Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Coin 1 Selection */}
        <div className="card bg-blue-50 shadow-md p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Select Coin 1</h2>
          {loadingCoins ? (
            <div>Loading coins...</div>
          ) : (
            <select
              value={coin1Id || ""}
              onChange={(e) => setCoin1Id(e.target.value)}
              className="select select-bordered w-full hover:cursor-pointer"
            >
              <option value="">-- Choose a coin --</option>
              {allCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          )}
          {loading1 && <div className="text-center mt-4 hover:cursor-pointer">Loading {coin1?.name}...</div>}
          {error1 && <Alert message="Error loading coin 1" type="error" />}
          {coin1 && (
            <div className="mt-6 text-center">
              <img src={coin1.image?.large} alt={coin1.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-bold">{coin1.name}</h3>
              <p className="text-amber-800">{coin1.symbol?.toUpperCase()}</p>
            </div>
          )}
        </div>

        {/* Coin 2 Selection */}
        <div className="card bg-purple-50 shadow-md p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Select Coin 2</h2>
          {loadingCoins ? (
            <div>Loading coins...</div>
          ) : (
            <select
              value={coin2Id || ""}
              onChange={(e) => setCoin2Id(e.target.value)}
              className="select select-bordered w-full hover:cursor-pointer"
            >
              <option value="">-- Choose a coin --</option>
              {allCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          )}
          {loading2 && <div className="text-center mt-4">Loading {coin2?.name}...</div>}
          {error2 && <Alert message="Error loading coin 2" type="error" />}
          {coin2 && (
            <div className="mt-6 text-center">
              <img src={coin2.image?.large} alt={coin2.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-bold">{coin2.name}</h3>
              <p className="text-amber-800">{coin2.symbol?.toUpperCase()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {comparison && (
        <div className="card bg-amber-50 shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 font-bold text-2xl">
            <div className="text-center">{comparison.coin1.name}</div>
            <div className="text-center">Metric</div>
            <div className="text-center">{comparison.coin2.name}</div>
          </div>

          <div className="overflow-x-auto text-gray-800">
            <div>
              <MetricRow label="Current Price" metric="currentPrice" />
              <MetricRow label="Market Cap Rank" metric="marketCapRank" higherIsBetter={false} />
              <MetricRow label="Market Cap" metric="marketCap" />
              <MetricRow label="24h Price Change %" metric="priceChange24h" />
              <MetricRow label="7d Price Change %" metric="priceChange7d" />
              <MetricRow label="30d Price Change %" metric="priceChange30d" />
              <MetricRow label="All-Time High" metric="allTimeHigh" />
              <MetricRow label="All-Time Low" metric="allTimeLow" />
              <MetricRow label="24h Volume" metric="volume24h" />
              <MetricRow label="Circulating Supply" metric="circulatingSupply" />
              <MetricRow label="Total Supply" metric="totalSupply" />
              <MetricRow label="Fully Diluted Valuation" metric="fullyDilutedValuation" />
            </div>
          </div>
        </div>
      )}

      {!comparison && (coin1Id || coin2Id) && (
        <div className="text-center text-gray-500 mt-8">
          {isLoading ? (
            <div className="text-lg">Loading comparison data...</div>
          ) : (
            <div className="text-lg">Select both coins to see comparison</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Compare;