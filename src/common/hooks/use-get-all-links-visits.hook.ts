import { useQuery } from "@tanstack/react-query";
import { FormattedVisit } from "../interfaces/formatted-visit.interface";
import Api from "../services/api.service";
import { DateRange } from "react-day-picker";
import mmt from "@/lib/moment";

export const useGetAllLinksVisits = (date?: DateRange) => {
  const fetchAllLinksVisits = async (): Promise<FormattedVisit[]> => {
    let url = `/visits/list?`;
    if (date?.from) url += `&start_date=${mmt(date.from).format("YYYY-MM-DD")}`;
    if (date?.to) url += `&end_date=${mmt(date.to).format("YYYY-MM-DD")}`;
    const { data } = await Api.get(url);
    return data.visits as FormattedVisit[];
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["allLinksVisits", date],
    queryFn: fetchAllLinksVisits,
  });

  return {
    visits: data,
    isFetching,
    refetch,
  };
};
