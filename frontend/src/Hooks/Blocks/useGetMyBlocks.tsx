import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface IMyBlockParameters {
	page: string;
	limit: string;
	sortBy: string; // options: views rating lastUpdated createdDate
	sortOrder: string; // options: desc asc
}

const getRequest = async (myBlockParameters: IMyBlockParameters) => {
	const response = await axios.get(
		`/api/v1/blocks/my-blocks?page=${myBlockParameters.page}&limit=${myBlockParameters.limit}&sortBy=${myBlockParameters.sortBy}&sortOrder=${myBlockParameters.sortOrder}`
	);
	return response.data;
};

export const useGetMyBlocks = (myBlockParameters: IMyBlockParameters) => {
	const {
		isLoading: LoadingMyBlocks,
		error: ErrorMyBlocks,
		data: MyBlocksData,
		refetch,
	} = useQuery(["getMyBlocks"], async () => {
		const response = await getRequest(myBlockParameters);
		return response;
	});

	return { LoadingMyBlocks, ErrorMyBlocks, MyBlocksData, refetch };
};
