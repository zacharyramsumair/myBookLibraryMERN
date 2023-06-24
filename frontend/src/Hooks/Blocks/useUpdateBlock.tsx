import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IBlock {
	title: string;
	tags: string[];
	imageUrl:string;
	text:string;
	price:number;
	tier:string;
	oldTier:string;
}

interface IData{
    id:string,
    blockInfo: IBlock
}

const putRequest = async (data: IData) => {
	const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blocks/block/${data.id}`, data.blockInfo);
	// console.log(response.data);
	return response.data;
};

export const useUpdateBlock = () => {
	const {
		mutate: updateBlock,
		isLoading: isLoadingUpdateBlock,
		isError: isErrorUpdateBlock,
		isSuccess: isSuccessUpdateBlock,
		data: UpdateBlockData,
		error: errorUpdateBlock,
	} = useMutation(putRequest);
	return {
		updateBlock,
		errorUpdateBlock,
		UpdateBlockData,
		isErrorUpdateBlock,
		isLoadingUpdateBlock,
		isSuccessUpdateBlock,
	};
};
