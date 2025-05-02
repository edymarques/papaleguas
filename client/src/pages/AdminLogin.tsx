import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRunning } from "react-icons/fa";

const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return apiRequest('POST', '/api/auth/login', data);
    },
    onSuccess: () => {
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o painel administrativo.",
      });
      window.location.href = "/admin";
    },
    onError: () => {
      toast({
        title: "Falha no login",
        description: "Nome de usuário ou senha incorretos.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <FaRunning className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">Papaléguas<span className="text-secondary">Mudanças</span></span>
          </div>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de Usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Autenticando..." : "Entrar"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm">
              <p>
                <a href="/" className="text-primary hover:underline">
                  Voltar para o site
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Para acesso de demonstração:</p>
          <p>Usuário: admin | Senha: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
