import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails } from "../Services/fetchCoinDetails";
import { CurrencyContext } from "../Context/ContextProvider";
import { useContext } from "react";
import parse from "html-react-parser";
import CoinInfo from "../CoinInfo/CoinInfo";

const CoinDetails = () => {
  const { currency } = useContext(CurrencyContext);
  const { coinId } = useParams();

  const {
    data: coin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => fetchCoinDetails(coinId),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    console.log(coin);
  }, [coin]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching coin details.</div>;

  return (
    <div className="w-full px-6 py-8">
      {/* Main flex container */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        
        {/* Left Side: Coin details */}
        <div className="crypto-card w-full md:w-2/3 bg-amber-100 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Coin Image */}
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md hover:scale-110 hover:rotate-3 transition-transform duration-500"
            />

            {/* Coin Name */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">
              {coin?.name}
            </h1>

            {/* Coin Description */}
            <p className="coin-details text-sm md:text-base text-gray-600 leading-relaxed mt-3">
              {parse(coin.description?.en || "")}
            </p>

            {/* Rank & Price */}
            <div className="mt-6 space-y-3">
              <p className="text-lg font-semibold bg-blue-50 text-blue-600 px-4 py-2 rounded-xl">
                Rank: #{coin.market_cap_rank}
              </p>
              <p className="text-xl md:text-2xl font-bold text-green-600">
                Price: {coin.market_data?.current_price[currency]} {currency}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Coin Chart Data */}
        <div className="crypto-card w-full md:w-2/3 bg-gray-300 rounded-2xl shadow-lg p-6">
          <CoinInfo coinId={coinId} />
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
