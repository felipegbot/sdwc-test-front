import { ChartData, Dataset } from "../interfaces/chart-data.interface";
import { FormattedVisit } from "../interfaces/formatted-visit.interface";

export const formatLineChartDataCountAll = (
  data: FormattedVisit[],
): ChartData => {
  if (data.length === 0) {
    return { labels: [], datasets: [] };
  }
  const color = `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
  //
  // here we presume that the first visit has all the links
  const datasets: Dataset[] = [
    {
      label: "Clicks totais",
      data: data.map((visit) => visit.count),
      backgroundColor: color,
      borderColor: color,
    },
  ];

  const labels: string[] = [];
  data.forEach((visit) => {
    labels.push(visit.date);
  });

  return { labels, datasets };
};
