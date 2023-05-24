import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type FormValues = {
    email: string;
    password: string;
}

const postRequest = async (data:FormValues) => {
    const response = await axios.post(`/api/v1/auth/login`, data);
    console.log(response.data)
    return response.data;
};





type Props = {}

export const useLoginUser = () => {
    const { mutate: loginUser, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { loginUser, error, data, isError, isLoading, isSuccess }
}