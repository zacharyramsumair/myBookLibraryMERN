import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


interface IMyBlockParameters {
    page: string;
    limit: string;
    sortBy: string; // options: views rating lastUpdated createdDate
    sortOrder: string; // options: desc asc

}

const postRequest = async (myBlockParameters: IMyBlockParameters) => {
    const response = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/v1/blocks/my-blocks?page=${myBlockParameters.page}&limit=${myBlockParameters.limit}&sortBy=${myBlockParameters.sortBy}&sortOrder=${myBlockParameters.sortOrder}`);
    return response.data;
};






export const usePostMyBlock = () => {
    const { mutate: postMyBlock, isLoading:isLoadingPostMyBlock, isError:isErrorPostMyBlock, isSuccess:isSuccessPostMyBlock, data:PostMyBlockData, error:errorPostMyBlock } = useMutation(postRequest);
    return { postMyBlock, errorPostMyBlock, PostMyBlockData, isErrorPostMyBlock, isLoadingPostMyBlock, isSuccessPostMyBlock }
}