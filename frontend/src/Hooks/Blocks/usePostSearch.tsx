import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


interface ISearchParameters {
    page: string;
    limit: string;
    title: string;
    sort: string; // options: viewsDesc, viewsAsc, ratingDesc, ratingAsc, default
    tag: string;
  }

const postRequest = async (searchParameters: ISearchParameters) => {
    const response = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/v1/blocks/search?title=${searchParameters.title}&page=${searchParameters.page}&limit=${searchParameters.limit}&sort=${searchParameters.sort}&tag=${searchParameters.tag}`);
    // console.log(response.data)
    return response.data;
};






export const usePostSearch = () => {
    const { mutate: postSearch, isLoading:isLoadingPostSearch, isError:isErrorPostSearch, isSuccess:isSuccessPostSearch, data:PostSearchData, error:errorPostSearch } = useMutation(postRequest);
    return { postSearch, errorPostSearch, PostSearchData, isErrorPostSearch, isLoadingPostSearch, isSuccessPostSearch }
}