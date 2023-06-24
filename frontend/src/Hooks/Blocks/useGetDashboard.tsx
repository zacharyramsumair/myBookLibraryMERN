import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const getRequest = async () => {
    const response = await axios.get(`/api/v1/blocks/dashboard`);
    // console.log(response.data)
    return response.data;
};





type Props = {}

export const useGetDashboard = () => {
    const { data, error, isLoading, isError  } = useQuery(['getDashboard'], getRequest);;
    return { data, error, isLoading, isError  }
}