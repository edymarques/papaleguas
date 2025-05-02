import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Pronto para uma Mudança Tranquila?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Entre em contato conosco hoje mesmo e solicite um orçamento gratuito para sua mudança. 
          Nossa equipe está pronta para atender suas necessidades.
        </p>
        <a 
          href="#contato" 
          className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md inline-block transition-colors"
        >
          Solicitar Orçamento
        </a>
      </div>
    </section>
  );
};

export default CTASection;
