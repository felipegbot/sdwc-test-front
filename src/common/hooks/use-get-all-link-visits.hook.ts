import { useQuery } from "@tanstack/react-query";
import { FormattedVisit } from "../interfaces/formatted-visit.interface";
import Api from "../services/api.service";
import { DateRange } from "react-day-picker";
import mmt from "@/lib/moment";

export const useGetAllLinkVisits = (linksId: string[], date?: DateRange) => {
  const fetchAllLinksVisits = async (): Promise<FormattedVisit[]> => {
    let url = `/visits/by-links?linkIds=${linksId.join(",")}`;
    if (date?.from) url += `&start_date=${mmt(date.from).format("YYYY-MM-DD")}`;
    if (date?.to) url += `&end_date=${mmt(date.to).format("YYYY-MM-DD")}`;
    const { data } = await Api.get(url);
    return data.visits as FormattedVisit[];
  };

  const { data } = useQuery({
    queryKey: ["allLinksVisitsByLinksId", linksId, date],
    queryFn: fetchAllLinksVisits,
  });

  return {
    visits: data,
  };
};
