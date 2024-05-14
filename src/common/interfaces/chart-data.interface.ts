export interface Dataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor: string;
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}
