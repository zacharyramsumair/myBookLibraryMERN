import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// interface IBlock{
//     title:string,
//     tags:string[],
//     price:number,
//     tier:string,
//     imageUrl: string;
// 	text: string;

// }

const postRequest = async (id: string) => {
	const response = await axios.post(`/api/v1/blocks/buy/${id}`);
	console.log(response.data);
	return response.data;
};

export const useBuyBlock = () => {
	const {
		mutate: buyBlock,
		isLoading:isLoadingBuyBlock,
		isError:isErrorBuyBlock,
		isSuccess:isSuccessBuyBlock,
		data:BuyBlockData,
		error:errorBuyBlock,
	} = useMutation(postRequest);
	return { buyBlock, errorBuyBlock, BuyBlockData, isErrorBuyBlock, isLoadingBuyBlock, isSuccessBuyBlock };
};
