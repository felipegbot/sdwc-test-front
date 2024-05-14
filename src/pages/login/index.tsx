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

const LoginPage = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("email");
    const password = formData.get("password");

    try {
      await Api.post("/auth/authenticate", {
        username,
        password,
      });
      toast.success("Login efetuado com sucesso");
      router.push("/");
    } catch (error) {
      toastError(error);
    }
  }
  return (
    <div className="w-full h-full flex-col justify-center flex items-center p-8">
      <Card className="p-8 space-y-6 max-w-md w-full">
        <span className="text-2xl">Painel de Métricas</span>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
              Login
            </Button>
            <span>
              Clique{" "}
              <Link className="hover:underline " href="/create-account">
                aqui
              </Link>{" "}
              para criar uma conta
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
