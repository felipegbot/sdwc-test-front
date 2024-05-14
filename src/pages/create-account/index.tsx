import Api from "@/common/services/api.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/router";
import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import { toastError } from "@/lib/toastify/toastError";
import Link from "next/link";

const CreateAccountPage = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await Api.post("/user/create", {
        name,
        email,
        password,
      });
      toast.success("Conta criada com sucesso");
      router.push("/login");
    } catch (error) {
      toastError(error);
    }
  }
  return (
    <div className="w-full h-[100vh] flex-col justify-center flex items-center">
      <Card className="p-8 space-y-6 max-w-md w-full">
        <span className="text-2xl">Crie sua conta</span>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="name">Insira seu nome</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="fulano da silva"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Insira seu email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="user@sdwc.me"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Insira sua senha</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="sdwc123"
              required
            />
          </div>
          <div className="flex flex-col w-fit space-y-2">
            <Button type="submit" className="w-min">
              Criar conta
            </Button>
            <span>
              Clique{" "}
              <Link className="hover:underline " href="/login">
                aqui
              </Link>{" "}
              para fazer login
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
