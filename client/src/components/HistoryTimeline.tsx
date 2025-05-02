import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TimelineEntry } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

const HistoryTimeline: React.FC = () => {
  // Fetch timeline entries from the API
  const { data: timelineEntries, isLoading, error } = useQuery<TimelineEntry[]>({
    queryKey: ["/api/timeline"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Carregando nossa história...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Erro ao carregar a linha do tempo.</p>
      </div>
    );
  }

  return (
    <section id="historia" className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nossa História</h2>
          <p className="text-[#343A40] max-w-2xl mx-auto">
            Acompanhe a evolução da Papaléguas Mudanças ao longo dos anos e como nos tornamos referência no setor.
          </p>
        </div>
        
        <div className="timeline-container">
          {timelineEntries?.map((entry, index) => (
            <div 
              key={entry.id} 
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} mb-8`}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold font-heading mb-2">{entry.year} - {entry.title}</h3>
                  <p className="text-[#343A40] mb-4">{entry.description}</p>
                  {entry.imageUrl && (
                    <img 
                      src={entry.imageUrl} 
                      alt={`${entry.title} - ${entry.year}`} 
                      className="rounded-lg w-full h-auto mt-4"
                      width="500"
                      height="300"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
