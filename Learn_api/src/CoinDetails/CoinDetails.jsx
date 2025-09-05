import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails } from "../Services/fetchCoinDetails";
import { CurrencyContext } from "../Context/ContextProvider";
import { useContext } from "react";
import parse from "html-react-parser";

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
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Coin Image */}
          <img
            src={coin?.image?.large}
            alt={coin?.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md transform scale-95 opacity-0 animate-[floatIn_1s_ease-out_forwards] hover:scale-110 hover:rotate-3 transition-transform duration-500"
          />

          {/* Coin Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 opacity-0 animate-[fadeSlideDown_1s_ease-in-out_forwards_0.3s]">
            {coin?.name}
          </h1>

          {/* Coin Details */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-3 opacity-0 animate-[fadeIn_1.2s_ease-in_forwards_0.6s]">
            {parse(coin.description?.en)}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-0.4">
          <p className="text-lg font-semibold bg-blue-50 text-blue-600 px-4 py-2 rounded-xl">
            Rank: #{coin.market_cap_rank}
          </p>

          <p className="text-xl md:text-2xl font-bold text-green-600 animate-[pulseGlow_1.5s_ease-in-out_infinite_alternate]">
            Price: {coin.market_data?.current_price[currency]} {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
