import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string | null;
    password: string;
    token: string | null ;
}

const postRequest = async (data:FormValues) => {
    const response = await axios.post(`/api/v1/auth/reset-password`, data);
    console.log(response.data)
    return response.data;
};





type Props = {}

export const useResetPassword = () => {
    const { mutate: resetPassword, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { resetPassword, error, data, isError, isLoading, isSuccess }
}