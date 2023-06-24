import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async () => {
	const response = await axios.get(`/api/v1/auth//profile/money-earned`);
	return response.data;
};

export const useGetMoneyEarned = () => {
	const { isLoading, error, data, refetch } = useQuery(
		["getMoneyEarned"],
		async () => {
			const response = await getRequest();
			return response;
		}
	);

	return {
		isLoading,
		error,
		data,
		refetch,
	};
};
