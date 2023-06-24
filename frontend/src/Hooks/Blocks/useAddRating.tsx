import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
    id:string,
    rating:number,
}

const postRequest = async (props:Props) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blocks/rate/${props.id}`, {rating:props.rating} );
    // console.log(response.data)
    return response.data;
};






export const useAddRating = () => {
    const { mutate: addRating, isLoading:isLoadingAddRating, isError:isErrorAddRating, isSuccess:isSuccessAddRating, data:AddRatingData, error:errorAddRating } = useMutation(postRequest);
    return { addRating, errorAddRating, AddRatingData, isErrorAddRating, isLoadingAddRating, isSuccessAddRating }
}