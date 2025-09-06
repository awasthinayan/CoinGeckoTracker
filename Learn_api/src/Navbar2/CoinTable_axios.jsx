import { useContext, useState } from "react";
import { fetchCoinData } from "../Services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";
import { CurrencyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

function CoinTable2() {
  const navigate = useNavigate();

  const handleCoinRedirect = (id) => {
    navigate(`/layout/coins/${id}`);
  };

  const { currency } = useContext(CurrencyContext);
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => fetchCoinData(page, currency),
    gcTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 w-[95vw] md:w-[80vw] mx-auto">
      <div className="text-2xl md:text-4xl text-center font-semibold">
        The Price of Bitcoin are given in{" "}
        <b className="glow2">{currency}</b>
      </div>

      {/* Table Header - hidden on mobile */}
      <div className="hidden sm:flex w-full bg-yellow-400 text-black py-4 px-2 font-semibold items-center justify-center">
        <div className="basis-[35%]">Coin</div>
        <div className="basis-[25%]">Price</div>
        <div className="basis-[20%]">24h change</div>
        <div className="basis-[20%]">Market Cap</div>
      </div>

      <div className="flex flex-col w-full">
        {isLoading && <div>Loading...</div>}
        {data &&
          data.map((coin) => {
            return (
              <div
                onClick={() => handleCoinRedirect(coin.id)}
                key={coin.id}
                className="w-full bg-transparent text-white flex flex-col sm:flex-row py-4 px-2 font-semibold items-center sm:justify-between cursor-pointer border-b border-gray-700"
              >
                {/* Coin + Image */}
                <div className="flex items-center gap-3 w-full sm:basis-[35%] mb-3 sm:mb-0">
                  <div className="w-12 h-12 sm:w-20 sm:h-20">
                    <img
                      src={coin.image}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg sm:text-2xl">{coin.name}</div>
                    <div className="text-sm sm:text-lg uppercase text-gray-400">
                      {coin.symbol}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-center w-full sm:flex sm:justify-between sm:w-auto sm:gap-0 sm:basis-[65%]">
                  <div className="text-sm sm:text-lg">
                    <span className="sm:hidden block font-bold">Price: </span>
                    {coin.current_price}
                  </div>
                  <div className="text-sm sm:text-lg">
                    <span className="sm:hidden block font-bold">24h: </span>
                    {coin.price_change_24h}
                  </div>
                  <div className="text-sm sm:text-lg col-span-2 sm:col-span-1">
                    <span className="sm:hidden block font-bold">Market Cap: </span>
                    {coin.market_cap}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary btn-wide text-white text-lg md:text-2xl"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary btn-wide text-white text-lg md:text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinTable2;
