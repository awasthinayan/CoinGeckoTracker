// ...existing code...
import React from "react";
import { useContext, useState } from "react";
import { fetchCoinHistoricData } from "../Services/fetchCoinInformation";
import { useQuery } from "@tanstack/react-query";
import { CurrencyContext } from "../Context/ContextProvider";
import Alert from "../Error_Alert/Alert";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const CoinInfo = ({ coinId }) => {
  const { currency } = useContext(CurrencyContext);

  const [days, setDays] = useState(1);
  // const [interval, setInterval] = useState("daily");

  const {
    data: historicData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coinHistoricData", currency, coinId, days],
    queryFn: () =>
      fetchCoinHistoricData(coinId && coinId.toLowerCase(), currency, days),
    enabled: !!coinId && !!currency,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  const dayOptions = [
    { label: "1 Day", value: 1 },
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
    { label: "365 Days", value: 365 },
  ];

  if (isLoading) return <div>Loading historic data...</div>;
  if (isError)
    return (
      <div>
        <Alert message={"Error: " + String(error)} type="error" />
      </div>
    );
  return (
    <div>
      {/* Dropdown to select days */}
      <div className="mb-4 flex items-center justify-end">
        <label
          htmlFor="days-select"
          className="mr-2 text-sm font-medium text-gray-700"
        >
          Range:
        </label>
        <select
          id="days-select"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg bg-gray-800 text-[.9rem] hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-600 transition-colors duration-400 hover:cursor-pointer"
        >
          {dayOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: 320 }}>
        <Line
          data={{
            labels: historicData?.prices?.map((coin) => {
              let date = new Date(coin[0]);
              let time = date.getHours() + ":" + date.getMinutes();
              return time;
            }),
            datasets: [
              {
                label: `Price ( Past ${days} ${
                  days === 1 ? "Day" : "Days"
                } ) in ${currency.toUpperCase()}`,
                data: historicData?.prices?.map((coin) => coin[1]),
                borderColor: "#EEBC1D",
                fill: true,
                backgroundColor: "rgba(238, 188, 29,0.5)",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default CoinInfo;
