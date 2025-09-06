
import axiosInstance from '../Axios_Instance/Axios_Inst'

export async function fetchCoinHistoricData(id,currency='usd',days=1,interval='daily',) {
    try {
        const response = await axiosInstance.get(`/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`);
        return response.data;

    } catch(error) {
        console.error(error); 
        throw error;    
    }
}

export default fetchCoinHistoricData;    