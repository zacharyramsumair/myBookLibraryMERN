import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async (profileId: string) => {
	const response = await axios.get(`/api/v1/auth/profile/${profileId}`);
	return response.data;
};

export const useGetProfile = (profileId: string) => {
	const {
		isLoading: LoadingProfile,
		error: ErrorProfile,
		data: ProfileData,
		refetch,
	} = useQuery(["getProfile"], async () => {
		const response = await getRequest(profileId);
		return response;
	});

	return { LoadingProfile, ErrorProfile, ProfileData, refetch };
};
