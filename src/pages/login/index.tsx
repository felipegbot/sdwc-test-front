import Api from "@/common/services/api.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/router";
import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import { toastError } from "@/lib/toastify/toastError";

const LoginPage = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("email");
    const password = formData.get("password");
    console.log(username, password);
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
    <div className="w-full h-[100vh] flex-col justify-center flex items-center">
      <Card className="p-8 space-y-6 max-w-md w-full">
        <span className="text-2xl">Painel de Métricas</span>
        <form onSubmit={handleSubmit} className=" space-y-6">
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
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
