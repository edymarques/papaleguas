import React from "react";
import { FaRunning, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212529] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold font-heading mb-4 flex items-center">
              <FaRunning className="text-3xl mr-2 text-primary" />
              <span>Papaléguas<span className="text-primary">Mudanças</span></span>
            </div>
            <p className="mb-4">Soluções completas para mudanças residenciais e comerciais com segurança, agilidade e profissionalismo.</p>
            <p>&copy; {new Date().getFullYear()} Papaléguas Mudanças. Todos os direitos reservados.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#historia" className="hover:text-primary transition-colors">Nossa História</a></li>
              <li><a href="#depoimentos" className="hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><a href="#servicos" className="hover:text-primary transition-colors">Mudanças Residenciais</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Mudanças Comerciais</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Mudanças de Longa Distância</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Embalagem e Desmontagem</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Armazenamento Temporário</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mr-3 mt-1" />
                <span>Av. das Mudanças, 1234, Centro, São Paulo - SP</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-primary mr-3 mt-1" />
                <span>(11) 5555-5555</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-primary mr-3 mt-1" />
                <span>contato@papaleguasmudancas.com.br</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
