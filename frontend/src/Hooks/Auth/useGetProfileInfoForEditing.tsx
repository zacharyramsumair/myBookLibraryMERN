import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/userprofile`);
  return response.data;
};

export const useGetProfileForUpdating = () => {
  const { isLoading: LoadingProfileForUpdating, error: ErrorProfileForUpdating, data: ProfileForUpdatingData, refetch } = useQuery(
    ["getProfileForUpdating"],
    async () => {
      const response = await getRequest();
      return response;
    },
    {
      cacheTime: 0, 
      refetchOnMount: false, // Do not refetch on component mount
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnReconnect: false, // Do not refetch on network reconnect
    }
  );

  return { LoadingProfileForUpdating, ErrorProfileForUpdating, ProfileForUpdatingData, refetch };
};
