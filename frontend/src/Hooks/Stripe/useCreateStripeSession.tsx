import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface IProductInfo {
	priceId: string;
	mode: string;
	productId:string;
}

const postRequest = async (data: IProductInfo) => {
	const response = await axios.post(`/api/v1/stripe/purchase`, data);
	// console.log(response.data);
	return response.data;
};

export const useCreateStripeSession = () => {
	const {
		mutate: createStripeSession,
		isLoading:isLoadingCreateStripeSession,
		isError:isErrorCreateStripeSession,
		isSuccess:isSuccessCreateStripeSession,
		data:dataCreateStripeSession,
		error:errorCreateStripeSession,
	} = useMutation(postRequest);
	return {
		createStripeSession,
		errorCreateStripeSession,
		dataCreateStripeSession,
		isErrorCreateStripeSession,
		isLoadingCreateStripeSession,
		isSuccessCreateStripeSession,
	};
};
