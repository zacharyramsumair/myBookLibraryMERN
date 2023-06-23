import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteRequest = async () => {
	const response = await axios.delete(`/api/v1/stripe/cancel-subscription`);
	console.log(response.data);
	return response.data;
};

export const useDeleteSubscription = () => {
	const {
		mutate: deleteSubscription,
		isLoading: isLoadingDeleteSubscription,
		isError: isErrorDeleteSubscription,
		isSuccess: isSuccessDeleteSubscription,
		data: DeleteSubscriptionData,
		error: errorDeleteSubscription,
	} = useMutation(deleteRequest);
	return {
		deleteSubscription,
		errorDeleteSubscription,
		DeleteSubscriptionData,
		isErrorDeleteSubscription,
		isLoadingDeleteSubscription,
		isSuccessDeleteSubscription,
	};
};
