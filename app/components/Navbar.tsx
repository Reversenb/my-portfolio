'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // ใช้ Icon สำหรับ Mobile Menu

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                ? "bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10 py-4" 
                : "bg-transparent py-6"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center">
                {/* Logo */}
                <motion.a 
                    href="#home"
                    className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Portfolio
                </motion.a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <motion.li key={link.name} whileHover={{ y: -2 }}>
                            <a 
                                href={link.href} 
                                className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <motion.div 
                    className="md:hidden absolute top-full left-0 w-full bg-[#0b0f19] border-b border-white/10 py-4 px-[5%]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    className="block text-gray-300 hover:text-white py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
}