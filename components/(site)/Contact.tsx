'use client'
import { useState, useEffect } from 'react'

const SUBJECTS = [
    'Renseignement sur une formation',
    'Problème technique',
    'Facturation / Paiement',
    'Partenariat',
    'Autre',
]

export default function ContactPage() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', subject: '', message: '',
    })
    const [sent, setSent] = useState(false)

    function update(key: string) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: appel API — ex: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
        setSent(true)
        setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.12 }
        )
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* HERO */}
            <div className="contact-hero">
                <div className="hero-tag">On vous répond sous 24h</div>
                <h1>Contactez-nous</h1>
            </div>

            {/* BODY */}
            <div className="contact-body">

                {/* LEFT — infos */}
                <div className="contact-info">
                    <div className="info-card reveal rd1">
                        <div className="info-card-top">
                            <div className="info-icon">📧</div>
                            <h4>Email</h4>
                        </div>
                        <p><a href="mailto:contact@iconnect.io">contact@iconnect.io</a></p>
                        <p><a href="mailto:support@iconnect.io">support@iconnect.io</a></p>
                    </div>

                    <div className="info-card reveal rd2">
                        <div className="info-card-top">
                            <div className="info-icon">📞</div>
                            <h4>Téléphone</h4>
                        </div>
                        <p><a href="tel:+242060000000">+242 06 000 00 00</a></p>
                        <p style={{ marginTop: 4, fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>Lun – Ven, 8h – 18h</p>
                    </div>

                    <div className="info-card reveal rd3">
                        <div className="info-card-top">
                            <div className="info-icon">📍</div>
                            <h4>Adresse</h4>
                        </div>
                        <p>Avenue de l'Indépendance<br />Pointe-Noire, République du Congo</p>
                    </div>

                    <div className="socials-card reveal">
                        <h4>Réseaux sociaux</h4>
                        <div className="social-links">
                            {['𝕏 Twitter', 'in LinkedIn', '▶ YouTube', '📸 Instagram'].map(s => (
                                <a key={s} href="#" className="social-btn">{s}</a>
                            ))}
                        </div>
                    </div>

                    <div className="hours-card reveal">
                        <h4>Horaires d'ouverture</h4>
                        <div className="hours-row">
                            <span>Lundi – Vendredi <span className="badge-open">Ouvert</span></span>
                            <span>8h – 18h</span>
                        </div>
                        <div className="hours-row">
                            <span>Samedi</span>
                            <span>9h – 13h</span>
                        </div>
                        <div className="hours-row">
                            <span>Dimanche</span>
                            <span style={{ color: 'rgba(255,100,100,0.6)' }}>Fermé</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT — formulaire */}
                <div className="contact-form-wrap reveal rd1">
                    <div className="form-header">
                        <h3>Envoyez-nous un message</h3>
                        <p>Tous les champs marqués d'un <span style={{ color: 'var(--orange)' }}>*</span> sont obligatoires.</p>
                    </div>

                    {sent && (
                        <div className="success-banner" id="successBanner">
                            <div className="success-icon">✓</div>
                            <div>
                                <strong style={{ color: 'white', display: 'block', marginBottom: 2 }}>Message envoyé !</strong>
                                Notre équipe vous répondra sous 24h.
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Prénom <span>*</span></label>
                                <input type="text" placeholder="Jean" value={form.firstName} onChange={update('firstName')} required />
                            </div>
                            <div className="form-group">
                                <label>Nom <span>*</span></label>
                                <input type="text" placeholder="Dupont" value={form.lastName} onChange={update('lastName')} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Adresse email <span>*</span></label>
                            <input type="email" placeholder="jean@exemple.com" value={form.email} onChange={update('email')} required />
                        </div>

                        <div className="form-group">
                            <label>Sujet <span>*</span></label>
                            <select value={form.subject} onChange={update('subject')} required>
                                <option value="" disabled>Choisir un sujet…</option>
                                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Message <span>*</span></label>
                            <textarea placeholder="Décrivez votre demande en détail…" value={form.message} onChange={update('message')} required />
                        </div>

                        <div className="form-footer">
                            <span className="form-note">🔒 Vos données sont protégées et ne seront jamais partagées.</span>
                            <button type="submit" className="btn-submit">
                                Envoyer le message
                                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* MAP STRIP */}
            <div className="map-strip reveal">
                <div className="map-strip-inner">
                    <div className="map-info">
                        <div className="map-dot" />
                        <div>
                            <strong>ICONNECT — Siège principal</strong>
                            <p>Avenue de l'Indépendance, Pointe-Noire, Congo</p>
                        </div>
                    </div>
                    <div className="map-divider" />
                    <div className="map-info">
                        <div style={{ fontSize: '1.4rem' }}>🚌</div>
                        <div><strong>Accès</strong><p>Bus ligne 4 · Arrêt Centre-ville</p></div>
                    </div>
                    <div className="map-divider" />
                    <div className="map-info">
                        <div style={{ fontSize: '1.4rem' }}>🅿️</div>
                        <div><strong>Parking</strong><p>Parking gratuit sur place</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}