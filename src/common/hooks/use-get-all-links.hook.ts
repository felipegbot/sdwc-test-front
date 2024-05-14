import { useQuery } from "@tanstack/react-query";
import Api from "../services/api.service";
import { Link } from "../interfaces/link.interface";

export const useGetAllLinks = () => {
  const fetchTopLinks = async (): Promise<Link[]> => {
    let url = `/link/list`;
    const { data } = await Api.get(url);
    return data.links as Link[];
  };

  const { data, refetch } = useQuery({
    queryKey: ["topLinks"],
    queryFn: fetchTopLinks,
  });

  return {
    links: data,
    refetch,
  };
};
