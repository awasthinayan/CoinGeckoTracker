import { useState, useEffect } from "react";

function CoinTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="text-white text-2xl mb-4">Crypto Tracker</h2>

      <table className="w-full text-white border-collapse">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="p-2 text-left">Coin</th>
            <th className="p-2">Price</th>
            <th className="p-2">24h Change</th>
            <th className="p-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            coins.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-700">
                <td className="flex items-center gap-2 p-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-gray-400 text-sm">{coin.symbol}</div>
                  </div>
                </td>
                <td className="text-center">${coin.current_price}</td>
                <td
                  className={`text-center ${
                    coin.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="text-center">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover hover:cursor-pointer"
        >
          Prev
        </button>
        <span className="text-white pt-1 text-[1.2rem]">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover hover:cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinTable;
