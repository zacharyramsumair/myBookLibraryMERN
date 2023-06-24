import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface IBlock{
    title:string,
    tags:string[],
    price:number,
    tier:string,
    imageUrl: string;
	text: string;

}

const postRequest = async (data:IBlock) => {
    const response = await axios.post(`/api/v1/blocks`,data );
    // console.log(response.data)
    return response.data;
};






export const useCreateBlock = () => {
    const { mutate: createBlock, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);
    return { createBlock, error, data, isError, isLoading, isSuccess }
}