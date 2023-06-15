import axios from "axios";
import { useQuery } from "@tanstack/react-query";



interface IGetUserShelfParameters{
page:string;
limit:string
}
const getRequest = async (getUserShelfParameters: IGetUserShelfParameters) => {
	// let apiString = `/api/v1/block/${data}`
	const response = await axios.get(`/api/v1/blocks/user-shelf?page=${getUserShelfParameters.page}&limit=${getUserShelfParameters.limit}`);
	return response.data;
};

// type Props = {}

export const useGetUserShelf = (getUserShelfParameters: IGetUserShelfParameters) => {
	const { isLoading, error, data, refetch } = useQuery(
		["getUserShelf"],
		async () => {
			const response = await getRequest(getUserShelfParameters);
			return response;
		}
	);

	return { isLoading, error, data, refetch };
};
