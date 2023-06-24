import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteRequest = async () => {
  const response = await axios.delete(`/api/v1/auth/logout`);
  // console.log(response.data);
  return response.data;
};

export const useLogout = () => {
  const { mutate: logout, isLoading, isError, isSuccess, data, error } = useMutation(deleteRequest);
  return { logout, error, data, isError, isLoading, isSuccess };
};
