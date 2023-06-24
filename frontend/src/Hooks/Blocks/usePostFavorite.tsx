import { useMutation } from '@tanstack/react-query';
import axios from 'axios';



const postRequest = async (id:string) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blocks/favorite/${id}` );
    // console.log(response.data)
    return response.data;
};






export const usePostFavorite = () => {
    const { mutate: postFavorite, isLoading:isLoadingPostFavorite, isError:isErrorPostFavorite, isSuccess:isSuccessPostFavorite, data:PostFavoriteData, error:errorPostFavorite } = useMutation(postRequest);
    return { postFavorite, errorPostFavorite, PostFavoriteData, isErrorPostFavorite, isLoadingPostFavorite, isSuccessPostFavorite }
}