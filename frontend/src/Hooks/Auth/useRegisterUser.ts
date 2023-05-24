import { useMutation } from '@tanstack/react-query';
import axios from 'axios';



const deleteRequest = async () => {
    const response = await axios.delete(`/api/v1/auth/logout`);
    console.log(response.data)
    return response.data;
};





type Props = {}

export const useRegisterUser = () => {
    const { mutate: registerUser, isLoading, isError, isSuccess, data, error } = useMutation(deleteRequest);
    return { registerUser, error, data, isError, isLoading, isSuccess }
}