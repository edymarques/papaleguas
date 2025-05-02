import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative bg-secondary text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Mudanças com Agilidade e Segurança</h1>
            <p className="text-lg mb-8">
              A Papaléguas Mudanças é especializada em serviços de mudanças residenciais e comerciais, 
              oferecendo soluções rápidas e seguras para qualquer necessidade.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#contato" 
                className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md text-center transition-colors"
              >
                Solicitar Orçamento
              </a>
              <a 
                href="#servicos" 
                className="bg-white hover:bg-opacity-90 text-secondary font-medium py-3 px-6 rounded-md text-center transition-colors"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600518365401-99eb6d79c576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Equipe da Papaléguas Mudanças em ação" 
              className="rounded-lg shadow-lg w-full h-auto object-cover" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-[#F8F9FA]" 
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />
    </section>
  );
};

export default HeroSection;
