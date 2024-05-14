import { TitleComponent } from "@/components/title";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllLinks } from "@/common/hooks/use-get-all-links.hook";
import { AlertTriangle, Repeat, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toastError } from "@/lib/toastify/toastError";
import Api from "@/common/services/api.service";
import { toast } from "react-toastify";

const TablePage = () => {
  const { links, refetch } = useGetAllLinks();

  const [currentConfirmId, setCurrentConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await Api.delete(`/link/delete/${id}`);
      setCurrentConfirmId(null);
      await refetch();
    } catch (error) {
      toastError(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");
    try {
      await Api.post("/link/create", { url });
      setCurrentConfirmId(null);
      await refetch();
    } catch (error) {
      toastError(error);
    }
  };

  const randomizeData = async () => {
    try {
      await Api.post("/visits/generate-data");
      toast.success("Dados gerados com sucesso");
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col px-8 space-y-4">
      <TitleComponent title="Dados" />
      <div
        className="px-4 flex flex-row cursor-pointer w-min rounded-full py-2 space-x-2 bg-green-800"
        onClick={randomizeData}
      >
        <span className="text-nowrap">Gerar dados aleatórios</span>
        <Repeat />
      </div>
      <Card className="flex flex-col w-full items-center py-8 px-2 space-y-4">
        <Table className="max-w-2xl w-full m-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Url</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links?.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.id}</TableCell>
                <TableCell>{link.url}</TableCell>
                <TableCell>
                  <div className="cursor-pointer">
                    {currentConfirmId === link.id ? (
                      <AlertTriangle
                        color="red"
                        onClick={() => handleDelete(link.id)}
                      />
                    ) : (
                      <Trash2 onClick={() => setCurrentConfirmId(link.id)} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row justify-center space-x-2"
        >
          <Input
            name="url"
            placeholder="Insira aqui o novo link que deseja rastrear"
            className="max-w-lg w-full"
          />
          <Button className="bg-white text-black" type="submit">
            Adicionar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TablePage;
