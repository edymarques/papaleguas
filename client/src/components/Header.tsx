import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Icons } from "@/lib/icons";
import logoPath from "@assets/logo-horizontal.png";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
          <div className="flex justify-between items-center py-4">
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

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <img 
                src={logoPath} 
                alt="Papaléguas Mudanças" 
                className="h-12" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="font-medium text-dark hover:text-primary transition-colors">Início</a>
            <a href="#servicos" className="font-medium text-dark hover:text-primary transition-colors">Serviços</a>
            <a href="#historia" className="font-medium text-dark hover:text-primary transition-colors">Nossa História</a>
            <a href="#depoimentos" className="font-medium text-dark hover:text-primary transition-colors">Depoimentos</a>
            <a href="#contato" className="font-medium text-dark hover:text-primary transition-colors">Contato</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-dark focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <Icons.Menu className="text-2xl" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden pb-4`}>
          <nav className="flex flex-col space-y-4">
            <a 
              href="#inicio" 
              className="font-medium text-dark hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Início
            </a>
            <a 
              href="#servicos" 
              className="font-medium text-dark hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Serviços
            </a>
            <a 
              href="#historia" 
              className="font-medium text-dark hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Nossa História
            </a>
            <a 
              href="#depoimentos" 
              className="font-medium text-dark hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Depoimentos
            </a>
            <a 
              href="#contato" 
              className="font-medium text-dark hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
