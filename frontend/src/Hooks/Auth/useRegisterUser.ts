import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface IUserData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const postRequest = async (data:IUserData) => {
    const response = await axios.post(`/api/v1/auth`,data );
    console.log(response.data)
    return response.data;
};






export const useRegisterUser = () => {
    const { mutate: registerUser, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { registerUser, error, data, isError, isLoading, isSuccess }
}