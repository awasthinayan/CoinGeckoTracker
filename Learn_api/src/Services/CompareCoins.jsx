import axiosInstance from '../Axios_Instance/Axios_Inst'

export async function fetchCoinForComparison(coinId) {
    try {
        const response = await axiosInstance.get(`/coins/${coinId}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching coin for comparison:', error);
        throw error;    
    }
}

// Compare two coins and return key metrics
export function compareCoinMetrics(coin1, coin2, currency = 'usd') {
    if (!coin1 || !coin2) return null;

    return {
        coin1: {
            id: coin1.id,
            name: coin1.name,
            symbol: coin1.symbol?.toUpperCase(),
            image: coin1.image?.large,
            currentPrice: coin1.market_data?.current_price[currency],
            marketCap: coin1.market_data?.market_cap[currency],
            marketCapRank: coin1.market_cap_rank,
            priceChange24h: coin1.market_data?.price_change_percentage_24h,
            priceChange7d: coin1.market_data?.price_change_percentage_7d,
            priceChange30d: coin1.market_data?.price_change_percentage_30d,
            allTimeHigh: coin1.market_data?.ath[currency],
            allTimeLow: coin1.market_data?.atl[currency],
            circulatingSupply: coin1.market_data?.circulating_supply,
            totalSupply: coin1.market_data?.total_supply,
            fullyDilutedValuation: coin1.market_data?.fully_diluted_valuation[currency],
            volume24h: coin1.market_data?.total_volume[currency],
        },
        coin2: {
            id: coin2.id,
            name: coin2.name,
            symbol: coin2.symbol?.toUpperCase(),
            image: coin2.image?.large,
            currentPrice: coin2.market_data?.current_price[currency],
            marketCap: coin2.market_data?.market_cap[currency],
            marketCapRank: coin2.market_cap_rank,
            priceChange24h: coin2.market_data?.price_change_percentage_24h,
            priceChange7d: coin2.market_data?.price_change_percentage_7d,
            priceChange30d: coin2.market_data?.price_change_percentage_30d,
            allTimeHigh: coin2.market_data?.ath[currency],
            allTimeLow: coin2.market_data?.atl[currency],
            circulatingSupply: coin2.market_data?.circulating_supply,
            totalSupply: coin2.market_data?.total_supply,
            fullyDilutedValuation: coin2.market_data?.fully_diluted_valuation[currency],
            volume24h: coin2.market_data?.total_volume[currency],
        }
    };
}

// Helper function to format currency values
export function formatCurrencyValue(value) {
    if (!value) return 'N/A';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
}

// Helper to determine better value
export function getBetterValue(val1, val2, higherIsBetter = true) {
    if (!val1 || !val2) return 'N/A';
    if (higherIsBetter) {
        return val1 > val2 ? 'coin1' : val2 > val1 ? 'coin2' : 'equal';
    } else {
        return val1 < val2 ? 'coin1' : val2 < val1 ? 'coin2' : 'equal';
    }
}