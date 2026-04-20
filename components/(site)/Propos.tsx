import Image from 'next/image'
import Link from 'next/link'


export const metadata = { title: 'À propos – ICONNECT' }

export default function AboutPage() {
   
    return (
        <>
            {/* HERO */}
            <section className="about-hero">
                <div className="hero-bg" /><div className="hero-glow" /><div className="hero-grid" />
                <div className="about-hero-content">
                    <div className="hero-tag">Notre histoire</div>
                    <h1>Former les <em>talents</em><br />de demain</h1>
                    <p>
                        ICONNECT est un centre de formation dédié à l'excellence, à l'innovation
                        et à l'insertion professionnelle dans les métiers du numérique.
                    </p>
                </div>
                <div className="hero-path">
                    <Link href="/">Accueil</Link>
                    <span>/</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>À propos</span>
                </div>
            </section>

            {/* MISSION */}
            <section className="mission">
                <div className="mission-inner">
                    <div className="mission-text">
                        <div className="section-tag">Notre mission</div>
                        <h2 className="section-title">Rendre la tech<br />accessible à tous</h2>
                        <p>Notre objectif est simple : rendre les compétences technologiques accessibles à tous et accompagner chaque apprenant vers une carrière réussie.</p>
                        <p>Nous proposons des formations modernes, pratiques et orientées vers les besoins réels du marché du travail africain et international.</p>

                        <div className="mission-highlights">
                            {[
                                { icon: '📚', title: 'Contenu à jour', sub: 'Programmes alignés sur les standards tech de 2026' },
                                { icon: '🤝', title: 'Suivi personnalisé', sub: 'Un formateur dédié pour chaque parcours' },
                                { icon: '🌍', title: 'Communauté globale', sub: 'Réseau d\'alumni actifs à travers l\'Afrique' },
                            ].map(h => (
                                <div key={h.title} className="highlight">
                                    <div className="highlight-dot">{h.icon}</div>
                                    <div className="highlight-text">
                                        <strong>{h.title}</strong>
                                        <span>{h.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mission-visual">
                        <div className="mission-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80"
                                alt="Équipe ICONNECT"
                                width={900} height={600}
                                style={{ width: '100%', height: 'auto', borderRadius: 16 }}
                            />
                            <div className="img-badge">
                                <div className="badge-icon">🏆</div>
                                <div className="badge-text">
                                    <strong>Meilleure plateforme</strong>
                                    <span>Formation tech 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALEURS */}
            <section className="values">
                <div className="values-inner">
                    <div className="values-header">
                        <div className="section-tag">Ce qui nous guide</div>
                        <h2 className="section-title">Nos valeurs</h2>
                        <p className="section-sub">Les principes qui définissent notre approche pédagogique et notre culture.</p>
                    </div>
                    <div className="values-grid">
                        {[
                            { icon: '⭐', title: 'Excellence', desc: 'Des formations de haute qualité adaptées aux standards internationaux les plus exigeants.', d: 'd1' },
                            { icon: '🤲', title: 'Accompagnement', desc: 'Un suivi personnalisé et bienveillant pour chaque apprenant, du début à la fin du parcours.', d: 'd2' },
                            { icon: '💡', title: 'Innovation', desc: 'Des méthodes pédagogiques modernes et des outils technologiques de pointe.', d: 'd3' },
                            { icon: '🌐', title: 'Accessibilité', desc: 'Démocratiser l\'accès aux compétences numériques pour tous, partout en Afrique.', d: 'd4' },
                        ].map(v => (
                            <div key={v.title} className={`value-card`}>
                                <div className="value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="about-stats">
                <div className="stats-inner">
                    {[
                        { num: '+1 200', label: 'Étudiants formés', d: 'd1' },
                        { num: '+35', label: 'Formations', d: 'd2' },
                        { num: '90%', label: 'Insertion professionnelle', d: 'd3' },
                    ].map(s => (
                        <div key={s.label} className={`stat-item`}>
                            <h2>{s.num}</h2>
                            <p>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <section className="team">
                <div className="team-inner">
                    <div className="team-header">
                        <div className="section-tag">L'équipe</div>
                        <h2 className="section-title">Des experts à votre service</h2>
                        <p className="section-sub">Des professionnels passionnés qui transmettent leur savoir-faire du terrain.</p>
                    </div>
                    <div className="team-grid">
                        {[
                            { src: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Jean Dupont', role: 'Formateur principal · Web', tag: 'HTML / React / Node.js', d: 'd1' },
                            { src: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Marie K.', role: 'Data Scientist', tag: 'Python · ML · Pandas', d: 'd2' },
                            { src: 'https://randomuser.me/api/portraits/men/12.jpg', name: 'Paul M.', role: 'UI/UX Designer', tag: 'Figma · Design System', d: 'd3' },
                        ].map(m => (
                            <div key={m.name} className={`team-card`}>
                                <div className="team-avatar-wrap">
                                    <img src={m.src} alt={m.name} width={80} height={80} style={{ borderRadius: '50%' }} />
                                    <div className="avatar-ring" />
                                </div>
                                <h3>{m.name}</h3>
                                <p className="role">{m.role}</p>
                                <span className="team-tag">{m.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <div className="cta-bg" /><div className="cta-glow" />
                <div className="cta-rings">
                    <div className="ring" /><div className="ring" /><div className="ring" />
                </div>
                <div className="cta-inner">
                    <div className="cta-text">
                        <div className="section-tag">Rejoignez-nous</div>
                        <h2>Prêt à démarrer<br />votre <em>aventure</em> ?</h2>
                        <p>Commencez votre parcours vers une carrière réussie dans le numérique dès aujourd'hui.</p>
                    </div>
                    <div className="cta-actions">
                        <div className="cta-perks">
                            {['Accès immédiat après inscription', 'Certificat de complétion inclus', 'Communauté d\'entraide active'].map(p => (
                                <div key={p} className="perk"><div className="perk-dot">✓</div> {p}</div>
                            ))}
                        </div>
                        <Link href="/register" className="btn-cta">
                            S'inscrire maintenant
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}