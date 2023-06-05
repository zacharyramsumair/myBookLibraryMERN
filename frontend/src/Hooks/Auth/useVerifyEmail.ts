import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string | null;
    verificationToken: string| null;
}

const putRequest = async (data:FormValues) => {
    const response = await axios.put(`/api/v1/auth/verify-email`, data);
    return response.data;
};





type Props = {}

export const useVerifyEmail = () => {
    const { mutate: VerifyEmailFunction, isLoading, isError, isSuccess, data, error } = useMutation(putRequest);
    return { VerifyEmailFunction, error, data, isError, isLoading, isSuccess }
}