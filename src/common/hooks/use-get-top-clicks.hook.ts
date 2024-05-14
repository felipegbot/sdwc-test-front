import { useQuery } from "@tanstack/react-query";
import Api from "../services/api.service";
import { DateRange } from "react-day-picker";
import mmt from "@/lib/moment";
import { Visit } from "../interfaces/visit.interface";

export const useGetTopLinks = (date?: DateRange) => {
  const fetchTopLinks = async (): Promise<Visit[]> => {
    let url = `/visits/top5?`;
    if (date?.from) url += `&start_date=${mmt(date.from).format("YYYY-MM-DD")}`;
    if (date?.to) url += `&end_date=${mmt(date.to).format("YYYY-MM-DD")}`;
    const { data } = await Api.get(url);
    return data.visits as Visit[];
  };

  const { data } = useQuery({
    queryKey: ["topLinks", date],
    queryFn: fetchTopLinks,
  });

  return {
    visits: data,
  };
};
