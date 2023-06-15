import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async (blockId: string) => {
	// let apiString = `/api/v1/block/${blockId}`
	const response = await axios.get(`/api/v1/blocks/block/${blockId}`);
	return response.data;
};

// type Props = {}

export const useGetSingleBlock = (blockId: string) => {
	const {
		isLoading: LoadingSingleBlock,
		error: ErrorSingleBlock,
		data: SingleBlockData,
		refetch,
	} = useQuery(
		["getSingleBlock"],
		async () => {
			const response = await getRequest(blockId);
			return response;
		},
		{
			cacheTime: 0, // Disable caching
			staleTime: 0, // Disable caching
		}
	);

	return { LoadingSingleBlock, ErrorSingleBlock, SingleBlockData, refetch };
};

// export const useGetSingleBlock = (id: string) => {

// 	let apiString = `/api/v1/block/${id}`;

// 	const {
// 		isLoading: LoadingSingleBlock,
// 		error: ErrorSingleBlock,
// 		data: SingleBlockData,
// 		refetch,
// 	} = useQuery(["SingleBlock"], () => axios(apiString), {
// 		refetchOnWindowFocus: true,
// 	});

// 	return { LoadingSingleBlock, ErrorSingleBlock, SingleBlockData, refetch };
// };
