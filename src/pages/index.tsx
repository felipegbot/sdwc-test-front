import { formatLineChartDataCountAll } from "@/common/helpers/format-line-chart-data-count-all.helper";
import { formatLineChartDataPerLink } from "@/common/helpers/format-line-chart-data-per-link.helper";
import { generateChartOption } from "@/common/helpers/generate-chart-options.helper";
import { useGetAllLinksVisits } from "@/common/hooks/use-get-all-links-visits.hook";
import { useWindowSize } from "@/common/hooks/use-window-size.hook";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { TitleComponent } from "@/components/title";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { DateRange } from "react-day-picker";

export default function Home() {
  const [date, setDate] = useState<DateRange | undefined>();
  const { visits } = useGetAllLinksVisits(date);
  const { width } = useWindowSize();
  const allLinksData = formatLineChartDataPerLink(visits ?? []);
  const allVisitsData = formatLineChartDataCountAll(visits ?? []);
  const valuesToCreateMaxY = allVisitsData.datasets[0]?.data;

  const onDateChange = (date?: DateRange) => {
    setDate(date);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 pb-8 space-y-4">
      <TitleComponent title="Gráficos" />
      <div className="flex flex-col items-center space-y-1">
        <span> Escolha o período</span>
        <DatePickerWithRange onChange={onDateChange} />
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
}
