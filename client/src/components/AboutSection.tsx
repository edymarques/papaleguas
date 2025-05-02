import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Equipe da Papaléguas Mudanças" 
              className="rounded-lg shadow-lg w-full h-auto object-cover" 
              width="600" 
              height="400"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Sobre a Papaléguas Mudanças</h2>
            <p className="text-[#343A40] mb-4">
              Somos uma empresa especializada em serviços de mudanças residenciais e comerciais, 
              comprometida em oferecer soluções eficientes e seguras para nossos clientes.
            </p>
            <p className="text-[#343A40] mb-4">
              Com anos de experiência no mercado, nossa equipe altamente treinada garante um 
              atendimento personalizado e cuidadoso, tratando seus pertences como se fossem nossos.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-[#E9ECEF] p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-1">750+</div>
                <div className="text-[#343A40]">Clientes Atendidos</div>
              </div>
              <div className="bg-[#E9ECEF] p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-[#343A40]">Anos de Experiência</div>
              </div>
            </div>
            <a 
              href="#historia" 
              className="mt-6 inline-block bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Nossa História
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
