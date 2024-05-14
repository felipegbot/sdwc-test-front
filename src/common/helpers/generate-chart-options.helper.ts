export const generateChartOption = (title: string, values: number[]) => {
  return {
    maintainAspectRatio: false,
    scales: {
      y: {
        max: Math.max(...(values ?? [])) + 10,
      },
    },

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};
