import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async (blockId: string) => {
  const response = await axios.get(`/api/v1/blocks/block/${blockId}`);
  return response.data;
};

export const useGetBlockForUpdating = (blockId: string) => {
  const { isLoading: LoadingBlockForUpdating, error: ErrorBlockForUpdating, data: BlockForUpdatingData, refetch } = useQuery(
    ["getBlockForUpdating"],
    async () => {
      const response = await getRequest(blockId);
      return response;
    },
    {
      cacheTime: 0, 
      refetchOnMount: false, // Do not refetch on component mount
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnReconnect: false, // Do not refetch on network reconnect
    }
  );

  return { LoadingBlockForUpdating, ErrorBlockForUpdating, BlockForUpdatingData, refetch };
};
