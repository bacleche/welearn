"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
    const revealRefs = useRef<HTMLElement[]>([]);

    // Scroll reveal via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="hero-glow"></div>
                <div className="hero-grid"></div>

                <div className="hero-content">
                    <div className="hero-tag">Plateforme d'apprentissage numérique</div>

                    <h1>
                        Devenez expert des<br></br>
                            <em>métiers du numérique</em>
                    </h1>

                    <p>
                        Formations professionnelles modernes pour accélérer votre carrière
                        dans la tech, le design et la data.
                    </p>

                    <div className="hero-buttons">
                        <a href="courses.html" className="btn-hero-primary">
                            Explorer les formations
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="about.html" className="btn-hero-secondary">Découvrir ICONNECT</a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3>+1 200</h3>
                            <span>Apprenants</span>
                        </div>
                        <div className="stat-item">
                            <h3>+35</h3>
                            <span>Formations</span>
                        </div>
                        <div className="stat-item">
                            <h3>95%</h3>
                            <span>Satisfaction</span>
                        </div>
                    </div>
                </div>

                <div className="scroll-hint">
                    <div className="scroll-dot"></div>
                    <span>Scroll</span>
                </div>
            </section>

            <section className="value">
                <div className="value-inner">
                    <div className="value-header reveal">
                        <div className="section-tag">Pourquoi ICONNECT</div>
                        <h2 className="section-title">Une formation<br></br>orientée résultats</h2>
                        <p className="section-sub">Des méthodes pensées pour vous faire progresser rapidement et efficacement.</p>
                    </div>

                    <div className="value-grid">
                        <div className="value-card reveal reveal-delay-1">
                            <div className="card-icon-wrap">🛠️</div>
                            <h3>Apprentissage pratique</h3>
                            <p>Travaillez sur des projets concrets et développez des compétences directement applicables en entreprise.</p>
                        </div>
                        <div className="value-card reveal reveal-delay-2">
                            <div className="card-icon-wrap">🎯</div>
                            <h3>Encadrement expert</h3>
                            <p>Des formateurs expérimentés pour vous accompagner à chaque étape de votre parcours.</p>
                        </div>
                        <div className="value-card reveal reveal-delay-3">
                            <div className="card-icon-wrap">🚀</div>
                            <h3>Carrière boostée</h3>
                            <p>Accédez à des opportunités professionnelles et développez votre employabilité sur le marché tech.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="courses">
                <div className="courses-inner">
                    <div className="courses-top reveal">
                        <div>
                            <div className="section-tag">Catalogue</div>
                            <h2 className="section-title">Formations populaires</h2>
                        </div>
                        <a href="courses.html" className="view-all">
                            Voir toutes les formations
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="course-grid">
                        <a href="courses.html" className="course-card reveal reveal-delay-1">
                            <span className="course-card-icon">🌐</span>
                            <h3>Développement Web</h3>
                            <p>Frontend, Backend et frameworks modernes pour créer des applications web performantes.</p>
                            <div className="course-card-footer">
                                <span className="course-meta">3 chapitres · 12h</span>
                                <span className="course-arrow">→</span>
                            </div>
                        </a>

                        <a href="courses.html" className="course-card reveal reveal-delay-2">
                            <span className="course-card-icon">📊</span>
                            <h3>Data & Intelligence Artificielle</h3>
                            <p>Python, Machine Learning et analyse de données pour maîtriser l'IA moderne.</p>
                            <div className="course-card-footer">
                                <span className="course-meta">2 chapitres · 8h</span>
                                <span className="course-arrow">→</span>
                            </div>
                        </a>

                        <a href="courses.html" className="course-card reveal reveal-delay-3">
                            <span className="course-card-icon">🎨</span>
                            <h3>Design UI/UX</h3>
                            <p>Créez des interfaces intuitives et esthétiques avec Figma et les principes UX.</p>
                            <div className="course-card-footer">
                                <span className="course-meta">1 chapitre · 6h</span>
                                <span className="course-arrow">→</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="cta-bg"></div>
                <div className="cta-glow"></div>
                <div className="cta-rings">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                </div>

                <div className="cta-inner">
                    <div className="cta-text reveal">
                        <div className="section-tag">Commencez aujourd'hui</div>
                        <h2>Prêt à transformer<br></br>votre <em>avenir</em> ?</h2>
                        <p>Rejoignez plus de 1 200 apprenants qui ont déjà boosté leur carrière grâce à ICONNECT.</p>
                    </div>

                    <div className="cta-actions reveal reveal-delay-2">
                        <div className="cta-perks">
                            <div className="perk"><div className="perk-dot">✓</div> Accès immédiat après inscription</div>
                            <div className="perk"><div className="perk-dot">✓</div> Formations mises à jour régulièrement</div>
                            <div className="perk"><div className="perk-dot">✓</div> Certificat de complétion inclus</div>
                        </div>
                        <a href="register.html" className="btn-cta">
                            Commencer maintenant
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}