import React from "react";
import { FaHome, FaBuilding, FaBox, FaTruck, FaShieldAlt, FaStore, FaArrowRight } from "react-icons/fa";

const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nossos Serviços</h2>
          <p className="text-[#343A40] max-w-2xl mx-auto">
            Oferecemos soluções completas para todos os tipos de mudanças, atendendo às suas necessidades com profissionalismo e cuidado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Serviço 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaHome className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Mudanças Residenciais</h3>
            <p className="text-[#343A40] mb-4">Realizamos mudanças residenciais com total segurança e agilidade, garantindo o cuidado com seus pertences.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
          
          {/* Serviço 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaBuilding className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Mudanças Comerciais</h3>
            <p className="text-[#343A40] mb-4">Escritórios e empresas podem contar com nossa equipe para uma mudança eficiente e com mínima interrupção.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
          
          {/* Serviço 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaBox className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Embalagem e Desmontagem</h3>
            <p className="text-[#343A40] mb-4">Oferecemos serviços de embalagem, desmontagem e montagem de móveis para garantir a segurança dos seus itens.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
          
          {/* Serviço 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaTruck className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Transporte de Longa Distância</h3>
            <p className="text-[#343A40] mb-4">Realizamos mudanças intermunicipais e interestaduais com segurança e pontualidade.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
          
          {/* Serviço 5 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaShieldAlt className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Mudanças com Seguro</h3>
            <p className="text-[#343A40] mb-4">Oferecemos opções de seguro para suas mudanças, garantindo tranquilidade durante todo o processo.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
          
          {/* Serviço 6 */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FaStore className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Armazenamento Temporário</h3>
            <p className="text-[#343A40] mb-4">Disponibilizamos armazenamento seguro para seus pertences em caso de necessidade durante a mudança.</p>
            <a href="#contato" className="text-primary font-medium hover:underline inline-flex items-center">
              Saiba mais
              <FaArrowRight className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
