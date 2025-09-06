import React, { useContext, useState } from "react";
import { CurrencyContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { setCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function gotoHome() {
    navigate("/");
  }

  // ✅ Collect all cached coins across pages/currencies
  function getCachedCoins() {
    const queries = queryClient.getQueriesData({ queryKey: ["coins"] });
    const all = queries
      .map(([, data]) => (Array.isArray(data) ? data : []))
      .flat();

    // dedupe by id
    const seen = new Set();
    return all.filter((c) => {
      if (!c?.id || seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  }

  // handle typing for suggestions
  function handleInputChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    const cachedData = getCachedCoins();

    if (value.length > 0) {
      const filtered = cachedData.filter((c) =>
        c.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // show top 5 matches
    } else {
      setSuggestions([]);
    }
  }

  // navigate on selecting suggestion
  function handleSelect(coinId) {
    setSearchOpen(false);
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/layout/coins/${coinId}`);
  }

  // fallback search submit
  function handleSearch(e) {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0].id);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={() => setCurrency("inr")}>INR</button>
            </li>
            <li>
              <button onClick={() => setCurrency("usd")}>USD</button>
            </li>
            <li>
              <button>About</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Crypto Tracker</a>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button onClick={gotoHome} className="btn btn-ghost">
          Home
        </button>

        {/* Search with suggestions */}
        {searchOpen ? (
          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-40 sm:w-60"
                placeholder="Search coin..."
                autoFocus
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Go
              </button>
            </form>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow-md w-full max-h-40 overflow-y-auto z-10">
                {suggestions.map((coin) => (
                  <li
                    key={coin.id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelect(coin.id)}
                  >
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
