import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string | null;
    password: string;
    token: string | null ;
}

const putRequest = async (data:FormValues) => {
    const response = await axios.put(`/api/v1/auth/reset-password`, data);
    // console.log(response.data)
    return response.data;
};






export const useResetPassword = () => {
    const { mutate: resetPassword, isLoading, isError, isSuccess, data, error } = useMutation(putRequest);
    return { resetPassword, error, data, isError, isLoading, isSuccess }
}