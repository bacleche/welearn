"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    // Pages où la navbar est cachée
    if (pathname === '/login' || pathname === '/register') return null

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fermer le menu si on clique sur l'overlay
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
                <div className="logo">
                    <Image src="/iconnect.png" alt="Logo ICONNECT" className="logo-img" width={140} height={40} />
                </div>

                {/* Overlay */}
                <div
                    className={`overlay${menuOpen ? " active" : ""}`}
                    onClick={closeMenu}
                />

                {/* Burger */}
                <div
                    className={`burger${menuOpen ? " active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <span />
                    <span />
                    <span />
                </div>

                <ul className={`nav-links${menuOpen ? " active" : ""}`}>
                    <li><Link href="/" onClick={closeMenu}>Accueil</Link></li>
                    <li><Link href="/about" onClick={closeMenu}>À propos</Link></li>
                    <li><Link href="/courses" onClick={closeMenu}>Cours</Link></li>
                    <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>

                    {/* Boutons auth — visibles uniquement dans le menu mobile */}
                    <li className="nav-auth-mobile">
                        <Link href="/login" className="btn-outline" onClick={closeMenu}>Connexion</Link>
                    </li>
                </ul>

                <div className="auth-buttons">
                    <Link href="/login" className="btn-outline">Connexion</Link>
                </div>
            </nav>
        </>
    );
}