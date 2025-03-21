"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@/app/providers";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-glass-dark backdrop-blur-md py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold tracking-widest gradient-text">
              AgentForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/agents" 
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
            >
              Marketplace
            </Link>
            <Link 
              href="/create" 
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
            >
              Create
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
          </div>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center gap-4">
            <WalletMultiButton className="hidden sm:flex neon-button !py-2 !px-4" />
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="block md:hidden text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-glass-dark backdrop-blur-md mt-4 py-4 px-4 rounded-b-lg">
          <div className="flex flex-col gap-4">
            <Link 
              href="/agents" 
              className="text-white/80 hover:text-white py-2 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              href="/create" 
              className="text-white/80 hover:text-white py-2 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create
            </Link>
            <Link 
              href="/dashboard" 
              className="text-white/80 hover:text-white py-2 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <WalletMultiButton className="neon-button !py-2 !px-4 w-full justify-center" />
          </div>
        </div>
      )}
    </nav>
  );
} 