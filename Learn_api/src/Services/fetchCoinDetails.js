
import axiosInstance from '../Axios_Instance/Axios_Inst'

export async function fetchCoinDetails(id) {
    try {
        const response = await axiosInstance.get(`/coins/${id}`);
        return response.data;

    } catch(error) {
        console.error(error);
        throw error;    
    }
}

export default fetchCoinDetails;    