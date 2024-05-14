import { useWindowSize } from "@/common/hooks/use-window-size.hook";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { TitleComponent } from "@/components/title";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTopLinks } from "@/common/hooks/use-get-top-clicks.hook";

const TablePage = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const { visits } = useGetTopLinks(date);
  const { width } = useWindowSize();

  const onDateChange = (date?: DateRange) => {
    setDate(date);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 space-y-4">
      <TitleComponent title="Tabelas" />
      <div className="flex flex-col items-center space-y-1 pb-4">
        <span>Escolha o período</span>
        <DatePickerWithRange onChange={onDateChange} />
      </div>

      <Card className="flex flex-col w-full items-center py-8">
        <span>Top 5 links mais acessados no período</span>
        <Table className="max-w-2xl w-full m-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>Clicks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits?.map((visit) => (
              <TableRow key={visit.link_id}>
                <TableCell className="font-medium">{visit.link_id}</TableCell>
                <TableCell>{visit.link_url}</TableCell>
                <TableCell>{visit.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>{" "}
      </Card>
    </div>
  );
};

export default TablePage;
