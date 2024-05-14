import { ChartData, Dataset } from "../interfaces/chart-data.interface";
import { FormattedVisit } from "../interfaces/formatted-visit.interface";

export const formatLineChartDataPerLink = (
  data: FormattedVisit[],
): ChartData => {
  if (data.length === 0) {
    return { labels: [], datasets: [] };
  }
  // here we presume that the first visit has all the links
  const datasets: Dataset[] = data[0].clicks.map((click) => {
    const color = `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
    return {
      label: click.link,
      data: [],
      backgroundColor: color,
      borderColor: color,
    };
  });

  const labels: string[] = [];

  data.forEach((visit) => {
    labels.push(visit.date);
    visit.clicks.forEach((click) => {
      const targetDataset = datasets.find(
        (dataset) => dataset.label === click.link,
      );
      if (!targetDataset) {
        const color = `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
        datasets.push({
          label: click.link,
          data: [click.visits],
          backgroundColor: color,
          borderColor: color,
        });
      } else {
        targetDataset.data.push(click.visits);
      }
    });
  });

  return { labels, datasets };
};
