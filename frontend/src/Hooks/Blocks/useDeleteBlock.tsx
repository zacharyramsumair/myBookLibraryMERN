import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const deleteRequest = async (id: string) => {
	const response = await axios.delete(`/api/v1/blocks/block/${id}`);
	console.log(response.data);
	return response.data;
};

export const useDeleteBlock = () => {
	const {
		mutate: deleteBlock,
		isLoading:isLoadingDeleteBlock,
		isError:isErrorDeleteBlock,
		isSuccess:isSuccessDeleteBlock,
		data:DeleteBlockData,
		error:errorDeleteBlock,
	} = useMutation(deleteRequest);
	return { deleteBlock, errorDeleteBlock, DeleteBlockData, isErrorDeleteBlock, isLoadingDeleteBlock, isSuccessDeleteBlock };
};
