import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const postRequest = async (data:FormValues) => {
    const response = await axios.post(`/api/v1/auth`, data);
    console.log(response.data)
    return response.data;
};





type Props = {}

export const useRegisterUser = () => {
    const { mutate: registerUser, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { registerUser, error, data, isError, isLoading, isSuccess }
}