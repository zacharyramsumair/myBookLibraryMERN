import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IProfileInfo {
	name: string;
	website: string;
	location: string;
	aboutMe: string;
	birthday: string;
	showFavorites: boolean;
	showFavoriteTags: boolean;
}

const putRequest = async (data: IProfileInfo) => {
	const response = await axios.put(`/api/v1/auth/profile`, data);
	console.log(response.data);
	return response.data;
};

export const useEditProfile = () => {
	const {
		mutate: editProfile,
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	} = useMutation(putRequest);
	return { editProfile, error, data, isError, isLoading, isSuccess };
};
