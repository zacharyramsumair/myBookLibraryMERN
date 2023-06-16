import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ISearchParameters {
  page: string;
  limit: string;
  title: string;
  sort: string; // options: viewsDesc, viewsAsc, ratingDesc, ratingAsc, default
  tag: string;
}

const getRequest = async (searchParameters: ISearchParameters) => {
  const response = await axios.get(
    `/api/v1/blocks/search?title=${searchParameters.title}&page=${searchParameters.page}&limit=${searchParameters.limit}&sort=${searchParameters.sort}&tag=${searchParameters.tag}`
  );
  return response.data;
};

export const useGetSearch = () => {
  const handleSearch = async (searchParameters: ISearchParameters) => {
    const response = await getRequest(searchParameters);
    return response;
  };

  const { isLoading, refetch } = useQuery(["getSearch"], handleSearch);

  return { isLoading, refetch, handleSearch };
};
