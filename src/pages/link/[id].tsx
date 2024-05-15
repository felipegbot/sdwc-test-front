import { formatLineChartDataCountAll } from "@/common/helpers/format-line-chart-data-count-all.helper";
import { formatLineChartDataPerLink } from "@/common/helpers/format-line-chart-data-per-link.helper";
import { generateChartOption } from "@/common/helpers/generate-chart-options.helper";
import { useWindowSize } from "@/common/hooks/use-window-size.hook";
import { useGetAllLinkVisits } from "@/common/hooks/use-get-all-link-visits.hook";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { TitleComponent } from "@/components/title";
import { Card } from "@/components/ui/card";
import { useGetAllLinks } from "@/common/hooks/use-get-all-links.hook";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { DateRange } from "react-day-picker";
import { useParams } from "next/navigation";

export const LinkPage = () => {
  const params = useParams();
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const { visits } = useGetAllLinkVisits(
    [(params ? params.id : "") as string, ...selectedLinks],
    date,
  );

  const { links } = useGetAllLinks();
  const { width } = useWindowSize();
  const allLinksData = formatLineChartDataPerLink(visits ?? []);
  const allVisitsData = formatLineChartDataCountAll(visits ?? []);
  const valuesToCreateMaxY = allVisitsData.datasets[0]?.data;

  const onDateChange = (date?: DateRange) => {
    setDate(date);
  };

  // here we can get the selected links but the Select component has some issues with the onChange type
  const onChange = async (e: any) => {
    const { value } = e.target as HTMLSelectElement;

    setSelectedLinks(value.split(",")[0] === "" ? [] : value.split(","));
  };

  return (
    <div className="h-full w-full flex flex-col px-8 pb-8 space-y-4">
      <TitleComponent title={`Gráfico do link com id ${params?.id}`} />
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col items-center space-y-1">
          <span>Escolha o período</span>
          <DatePickerWithRange onChange={onDateChange} />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Escolha links para comparar</span>
          <Select
            selectionMode="multiple"
            className="max-w-xs"
            onChange={onChange}
            popoverProps={{
              className: "dark",
              color: "default",
            }}
            variant="bordered"
          >
            {links?.length != undefined ? (
              links
                .filter((link) => link.id != params?.id)
                .map((link) => (
                  <SelectItem key={link.id} value={link.id}>
                    {link.url}
                  </SelectItem>
                ))
            ) : (
              // this is just a mock for SSR
              <SelectItem key={0} value={0}>
                mock
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      <Card className={`${width < 768 ? "h-full" : "-1/2"}`}>
        <Line
          data={allLinksData}
          options={generateChartOption(
            "Gráfico quantidade de visitas X dia, por link",
            valuesToCreateMaxY,
          )}
        />
      </Card>
      <Card className={`${width < 768 ? "h-full" : "-1/2"}`}>
        <Line
          data={allVisitsData}
          options={generateChartOption(
            "Gráfico quantidade clicks totais X dia",
            valuesToCreateMaxY,
          )}
        />
      </Card>
    </div>
  );
};
export default LinkPage;
