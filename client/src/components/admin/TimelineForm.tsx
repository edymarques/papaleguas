import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TimelineEntry, insertTimelineEntrySchema } from "@shared/schema";
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
import { Button } from "@/components/ui/button";

// Extend the schema with any additional validation or transformations
const timelineFormSchema = insertTimelineEntrySchema;

type TimelineFormValues = z.infer<typeof timelineFormSchema>;

interface TimelineFormProps {
  entry: TimelineEntry | null;
  onCancel: () => void;
  isCreating: boolean;
}

const TimelineForm: React.FC<TimelineFormProps> = ({ 
  entry, 
  onCancel,
  isCreating
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get all timeline entries to determine the next order
  const timelineEntries = queryClient.getQueryData<TimelineEntry[]>(["/api/timeline"]) || [];
  const maxOrder = Math.max(0, ...timelineEntries.map(e => e.order));
  
  const form = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineFormSchema),
    defaultValues: {
      title: entry?.title || "",
      description: entry?.description || "",
      year: entry?.year || "",
      imageUrl: entry?.imageUrl || "", // Convert null to empty string for form
      order: entry?.order || maxOrder + 1,
    },
  });
  
  // Mutation for creating a new entry
  const createMutation = useMutation({
    mutationFn: async (data: TimelineFormValues) => {
      return apiRequest('POST', '/api/timeline', data);
    },
    onSuccess: () => {
      toast({
        title: "Evento criado",
        description: "O evento foi adicionado com sucesso à linha do tempo.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/timeline"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar evento",
        description: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
  });
  
  // Mutation for updating an existing entry
  const updateMutation = useMutation({
    mutationFn: async (data: TimelineFormValues) => {
      if (!entry) throw new Error("No entry to update");
      return apiRequest('PUT', `/api/timeline/${entry.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/timeline"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar evento",
        description: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
  });
  
  const isPending = createMutation.isPending || updateMutation.isPending;
  
  function onSubmit(data: TimelineFormValues) {
    if (isCreating) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: O Início" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 2005, 2010, Hoje" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição detalhada do evento"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ordem na Linha do Tempo</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="bg-muted p-2 rounded-md">
          <p className="text-sm">Eventos com números menores aparecem primeiro na linha do tempo.</p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isPending}>
            {isPending ? "Salvando..." : isCreating ? "Criar Evento" : "Atualizar Evento"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TimelineForm;
