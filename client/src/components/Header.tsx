import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logoPath from "@assets/logo-horizontal.png";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Detectar rolagem para adicionar efeitos ao cabeçalho
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isAdminPage = location.startsWith("/admin");

  if (isAdminPage) {
    return (
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Link href="/">
                <img 
                  src={logoPath} 
                  alt="Papaléguas Mudanças" 
                  className="h-12" 
                />
              </Link>
            </div>
            <div className="flex items-center">
              <span className="mr-4 font-medium">Painel Administrativo</span>
              <Link href="/" className="text-primary hover:underline">
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Classe dinâmica com base na rolagem
  const headerClass = scrolled 
    ? "sticky top-0 bg-white shadow-md z-50 transition-all duration-300 py-2" 
    : "sticky top-0 bg-white z-50 transition-all duration-300 py-4";

  return (
    <>
      {/* Barra de informações de contato */}
      <div className="hidden md:block bg-primary/10 text-gray-700 py-2 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <FaPhoneAlt className="text-primary mr-2" size={14} />
                <span>(11) 5555-5555</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-primary mr-2" size={14} />
                <span>contato@papaleguasmudancas.com.br</span>
              </div>
            </div>
            <div className="text-sm">
              <span>Atendimento: Segunda a Sexta - 8h às 18h</span>
            </div>
          </div>
        </div>
      </div>
    
      {/* Menu principal */}
      <header className={headerClass}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/">
                <img 
                  src={logoPath} 
                  alt="Papaléguas Mudanças" 
                  className={scrolled ? "h-10 transition-all duration-300" : "h-14 transition-all duration-300"} 
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#servicos", label: "Serviços" },
                { href: "#historia", label: "Nossa História" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#contato", label: "Contato" }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="font-medium px-4 py-2 text-dark hover:text-primary rounded-md hover:bg-gray-100 transition-colors text-sm uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ))}
              
              <a 
                href="#contato" 
                className="ml-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm uppercase tracking-wide font-medium"
              >
                Orçamento
              </a>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="text-dark focus:outline-none p-2 rounded-md hover:bg-gray-100"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div 
            className={`${
              mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <nav className="flex flex-col space-y-2 py-4">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#servicos", label: "Serviços" },
                { href: "#historia", label: "Nossa História" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#contato", label: "Contato" }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="font-medium py-2 px-4 text-dark hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              ))}
              
              <a 
                href="#contato" 
                className="mt-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                Solicitar Orçamento
              </a>
              
              {/* Informações de contato no menu mobile */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 px-4">
                <div className="flex items-center">
                  <FaPhoneAlt className="text-primary mr-2" size={14} />
                  <span className="text-sm">(11) 5555-5555</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary mr-2" size={14} />
                  <span className="text-sm">contato@papaleguasmudancas.com.br</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
