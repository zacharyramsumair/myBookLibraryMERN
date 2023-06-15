import axios from "axios";
import { useQuery } from "@tanstack/react-query";



interface IFavoritesParameters{
page:string;
limit:string
}
const getRequest = async (favoritesParameters: IFavoritesParameters) => {
	// let apiString = `/api/v1/block/${data}`
	const response = await axios.get(`/api/v1/blocks/favorites?page=${favoritesParameters.page}&limit=${favoritesParameters.limit}`);
	return response.data;
};

// type Props = {}

export const useGetFavorites = (favoritesParameters: IFavoritesParameters) => {
	const { isLoading, error, data, refetch } = useQuery(
		["getfavorites"],
		async () => {
			const response = await getRequest(favoritesParameters);
			return response;
		}
	);

	return { isLoading, error, data, refetch };
};
