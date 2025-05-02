import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/lib/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Extend the schema with any additional validation
const contactFormSchema = insertContactSubmissionSchema.extend({
  email: z.string().email("Por favor, digite um e-mail válido."),
  phone: z.string().min(10, "Por favor, digite um telefone válido com DDD."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato! Retornaremos em breve.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }

  return (
    <section id="contato" className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Entre em Contato</h2>
          <p className="text-[#343A40] max-w-2xl mx-auto">
            Preencha o formulário abaixo e entraremos em contato o mais breve possível para discutir seu projeto de mudança.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu.email@exemplo.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 98765-4321" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serviço de Interesse</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential">Mudança Residencial</SelectItem>
                            <SelectItem value="commercial">Mudança Comercial</SelectItem>
                            <SelectItem value="long-distance">Mudança de Longa Distância</SelectItem>
                            <SelectItem value="packing">Serviço de Embalagem</SelectItem>
                            <SelectItem value="storage">Armazenamento Temporário</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva seu projeto de mudança" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-8">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-bold font-heading mb-6">Informações de Contato</h3>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <Icons.MapPin className="text-2xl text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Endereço</h4>
                    <p className="text-[#343A40]">
                      Av. das Mudanças, 1234<br />
                      Bairro Centro, São Paulo - SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <Icons.Phone className="text-2xl text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Telefone</h4>
                    <p className="text-[#343A40]">
                      (11) 5555-5555<br />
                      (11) 98765-4321
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <Icons.Mail className="text-2xl text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-[#343A40]">
                      contato@papaleguasmudancas.com.br<br />
                      orcamentos@papaleguasmudancas.com.br
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <Icons.Clock className="text-2xl text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Horário de Atendimento</h4>
                    <p className="text-[#343A40]">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-3">Siga-nos nas Redes Sociais</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                    <Icons.Facebook />
                  </a>
                  <a href="#" className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                    <Icons.Instagram />
                  </a>
                  <a href="#" className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                    <Icons.Whatsapp />
                  </a>
                  <a href="#" className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                    <Icons.Linkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
