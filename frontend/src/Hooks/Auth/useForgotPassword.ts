import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string;
}

const postRequest = async (data:FormValues) => {
    const response = await axios.post(`/api/v1/auth/forgot-password`, data);
    console.log(response.data)
    return response.data;
};





type Props = {}

export const useForgotPassword = () => {
    const { mutate: forgotPassword, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { forgotPassword, error, data, isError, isLoading, isSuccess }
}