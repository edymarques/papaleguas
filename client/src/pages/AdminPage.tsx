import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import TimelineEditor from "@/components/admin/TimelineEditor";
import TimelineForm from "@/components/admin/TimelineForm";
import { TimelineEntry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Fetch timeline entries
  const { data: timelineEntries, isLoading, error } = useQuery<TimelineEntry[]>({
    queryKey: ["/api/timeline"],
  });
  
  // Mutation for logging out
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/auth/logout', {});
    },
    onSuccess: () => {
      toast({
        title: "Logout bem-sucedido",
        description: "Você foi desconectado com sucesso.",
      });
      window.location.href = "/";
    },
    onError: () => {
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar. Tente novamente.",
        variant: "destructive",
      });
    },
  });
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const handleEditEntry = (entry: TimelineEntry) => {
    setSelectedEntry(entry);
    setIsCreating(false);
  };
  
  const handleCreateNewEntry = () => {
    setSelectedEntry(null);
    setIsCreating(true);
  };
  
  const handleCancelEdit = () => {
    setSelectedEntry(null);
    setIsCreating(false);
  };
  
  // Mutation for deleting entry
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/timeline/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Entrada excluída",
        description: "A entrada foi excluída com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/timeline"] });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir a entrada. Tente novamente.",
        variant: "destructive",
      });
    },
  });
  
  const handleDeleteEntry = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta entrada? Esta ação não pode ser desfeita.")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>
            <Icons.LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="timeline">Gerenciar Linha do Tempo</TabsTrigger>
            <TabsTrigger value="contact">Mensagens de Contato</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos na Linha do Tempo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full mb-4 bg-primary hover:bg-primary/90" 
                      onClick={handleCreateNewEntry}
                    >
                      <Icons.Plus className="mr-2 h-4 w-4" />
                      Adicionar Novo Evento
                    </Button>
                    
                    {isLoading && <p>Carregando eventos...</p>}
                    {error && <p className="text-red-500">Erro ao carregar eventos.</p>}
                    
                    {timelineEntries && timelineEntries.length > 0 ? (
                      <div className="space-y-4">
                        {timelineEntries.map((entry) => (
                          <TimelineEditor 
                            key={entry.id} 
                            entry={entry} 
                            onEdit={handleEditEntry} 
                            onDelete={handleDeleteEntry}
                            isSelected={selectedEntry?.id === entry.id}
                          />
                        ))}
                      </div>
                    ) : (
                      !isLoading && <p>Nenhum evento encontrado. Adicione um novo evento.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isCreating 
                        ? "Criar Novo Evento" 
                        : selectedEntry 
                          ? `Editar: ${selectedEntry.title}` 
                          : "Selecione um evento para editar"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(isCreating || selectedEntry) ? (
                      <TimelineForm 
                        entry={selectedEntry} 
                        onCancel={handleCancelEdit} 
                        isCreating={isCreating}
                      />
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icons.Edit className="mx-auto h-12 w-12 mb-4" />
                        <p>Selecione um evento para editar ou clique em "Adicionar Novo Evento"</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens de Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactMessagesList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Component to display contact form submissions
const ContactMessagesList: React.FC = () => {
  const { data: contactMessages, isLoading, error } = useQuery({
    queryKey: ["/api/contact"],
  });
  
  if (isLoading) return <p>Carregando mensagens...</p>;
  if (error) return <p className="text-red-500">Erro ao carregar mensagens de contato.</p>;
  
  return (
    <div className="space-y-4">
      {contactMessages && contactMessages.length > 0 ? (
        contactMessages.map((message: any) => (
          <Card key={message.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 bg-secondary/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{message.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString('pt-BR')} - {message.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>{message.email}</p>
                    <p>{message.phone}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p>{message.message}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Nenhuma mensagem de contato recebida.</p>
      )}
    </div>
  );
};

export default AdminPage;
