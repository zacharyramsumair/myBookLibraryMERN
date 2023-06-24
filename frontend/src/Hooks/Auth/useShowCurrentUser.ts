import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const getRequest = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/showCurrentUser`);
    // console.log(response.data)
    return response.data;
};





type Props = {}

export const useShowCurrentUser = () => {
    const { data, error, isLoading, isError  } = useQuery(['showCurrentUser'], getRequest);;
    return { data, error, isLoading, isError  }
}