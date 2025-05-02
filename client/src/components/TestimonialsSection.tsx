import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Serviço excelente! A equipe da Papaléguas foi extremamente profissional e cuidadosa com meus pertences. A mudança ocorreu dentro do prazo e sem imprevistos. Recomendo muito!",
    name: "Luiz Moreira",
    initials: "LM",
    service: "Mudança Residencial"
  },
  {
    id: 2,
    rating: 5,
    text: "Contratei a Papaléguas para a mudança da minha empresa e fiquei impressionada com a organização e eficiência. Conseguiram minimizar o tempo de inatividade e cuidaram de todos os equipamentos.",
    name: "Carla Silva",
    initials: "CS",
    service: "Mudança Comercial"
  },
  {
    id: 3,
    rating: 4.5,
    text: "Minha mudança interestadual foi realizada com perfeição pela Papaléguas. Pontualidade, cuidado com os móveis e um atendimento atencioso desde o orçamento até a entrega. Valeu cada centavo!",
    name: "Roberto Almeida",
    initials: "RA",
    service: "Mudança de Longa Distância"
  }
];

const TestimonialsSection: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  
  // For a simple demo, we're showing all testimonials at once on desktop
  // and paginating on mobile
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  
  // Get testimonials for the current page
  const getCurrentTestimonials = () => {
    const start = activePage * itemsPerPage;
    const end = start + itemsPerPage;
    return testimonials.slice(start, end);
  };

  return (
    <section id="depoimentos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-[#343A40] max-w-2xl mx-auto">
            Veja os depoimentos de clientes que confiaram na Papaléguas Mudanças para realizar seus serviços de mudança.
          </p>
        </div>
        
        <div className="testimonial-carousel relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentTestimonials().map((testimonial) => (
              <Card key={testimonial.id} className="bg-[#F8F9FA]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-primary flex">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <FaStar key={`star-full-${i}`} className="fill-current" />
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <FaStarHalfAlt className="fill-current" />
                      )}
                    </div>
                  </div>
                  <p className="text-[#343A40] mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span className="font-medium">{testimonial.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-[#343A40]">{testimonial.service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePage(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    activePage === index ? "bg-primary" : "bg-[#E9ECEF]"
                  }`}
                  aria-label={`Página ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
