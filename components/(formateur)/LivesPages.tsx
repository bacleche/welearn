'use client'

import { useState } from 'react'

// ── TYPES ──────────────────────────────────────────────────────
type UpcomingSession = {
    id: number
    course: string
    title: string
    desc: string
    date: string
    time: string
    attendees: number
    daysLeft: number
}

type PastSession = {
    id: number
    title: string
    course: string
    date: string
    duration: string
    participants: number
}

// ── DONNÉES ────────────────────────────────────────────────────
const UPCOMING: UpcomingSession[] = [
    {
        id: 1,
        course: 'UI/UX Avancé',
        title: 'Workshop : Créer un Design System complet',
        desc: 'Session pratique pour créer votre premier design system de A à Z avec Figma.',
        date: '15 Avr', time: '18h00 – 20h00',
        attendees: 47, daysLeft: 2,
    },
    {
        id: 2,
        course: 'HTML & CSS Pro',
        title: 'Live Coding – Responsive Design avancé',
        desc: 'On code ensemble une page complexe avec CSS Grid, Flexbox et les media queries.',
        date: '18 Avr', time: '19h00 – 21h00',
        attendees: 31, daysLeft: 5,
    },
    {
        id: 3,
        course: 'UI/UX Avancé',
        title: 'Prototypage avancé et micro-animations',
        desc: 'Découvrez les techniques de prototypage avancées et les micro-animations Figma.',
        date: '25 Avr', time: '17h30 – 19h30',
        attendees: 38, daysLeft: 12,
    },
    {
        id: 4,
        course: 'Figma Masterclass',
        title: 'Auto Layout et Variables avancées',
        desc: "Maîtrisez les fonctionnalités les plus puissantes de Figma pour accélérer votre workflow.",
        date: '2 Mai', time: '18h30 – 20h00',
        attendees: 22, daysLeft: 19,
    },
]

const PAST: PastSession[] = [
    { id: 1, title: 'Introduction aux systèmes de grilles', course: 'UI/UX Avancé', date: '1 Avr 2026', duration: '1h45', participants: 42 },
    { id: 2, title: 'CSS Variables et Custom Properties', course: 'HTML & CSS Pro', date: '25 Mar 2026', duration: '2h00', participants: 28 },
    { id: 3, title: 'Atelier Figma – Illustrations vectorielles', course: 'Figma Masterclass', date: '18 Mar 2026', duration: '1h30', participants: 35 },
    { id: 4, title: 'UX Writing et microcopy', course: 'UI/UX Avancé', date: '10 Mar 2026', duration: '1h15', participants: 29 },
    { id: 5, title: 'Accessibilité web – WCAG 2.2', course: 'HTML & CSS Pro', date: '2 Mar 2026', duration: '2h15', participants: 24 },
    { id: 6, title: 'Composants Figma – niveau expert', course: 'Figma Masterclass', date: '22 Fév 2026', duration: '1h45', participants: 38 },
]

// ── COMPOSANT ──────────────────────────────────────────────────
export default function LivesPages() {
    const [showModal, setShowModal] = useState(false)
    const [newSession, setNewSession] = useState({
        title: '', course: '', date: '', timeStart: '', timeEnd: '', desc: '',
    })

    function updateField(key: string) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setNewSession(s => ({ ...s, [key]: e.target.value }))
    }

    function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        // TODO: appel API création session
        setShowModal(false)
        setNewSession({ title: '', course: '', date: '', timeStart: '', timeEnd: '', desc: '' })
    }

    return (
        <>
            {/* ── EN-TÊTE ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">Sessions <span>Live</span></div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                        {UPCOMING.length} à venir · {PAST.length} sessions passées
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    🔴 Planifier une session
                </button>
            </div>

            {/* ── LIVE EN COURS ── */}
            <div className="live-upcoming">
                <div className="live-title">Q&A – Maîtriser les composants Figma</div>
                <div className="live-meta">
                    📚 Figma Masterclass 2025 · Démarré il y a 18 min · 24 participants
                </div>
                <div className="live-actions">
                    <button className="lb lb-white">🔗 Rejoindre la session</button>
                    <button className="lb lb-ghost">👥 Voir participants</button>
                    <button
                        className="lb lb-ghost"
                        style={{ background: 'rgba(239,68,68,.3)', borderColor: 'rgba(239,68,68,.5)' }}
                    >
                        ⏹ Terminer
                    </button>
                </div>
            </div>

            {/* ── PROCHAINES SESSIONS ── */}
            <div style={{ marginBottom: '1rem', fontSize: '.95rem', fontWeight: 700, color: 'var(--text)' }}>
                📅 Prochaines sessions
            </div>

            <div className="lives-grid" style={{ marginBottom: '2rem' }}>
                {UPCOMING.map(session => (
                    <div key={session.id} className="live-card">
                        <div className="live-card-header">
                            <span className="live-course-badge">{session.course}</span>
                            <span className="live-status ls-upcoming">
                                ⏰ Dans {session.daysLeft} jour{session.daysLeft > 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="live-card-title">{session.title}</div>
                        <div className="live-card-desc">{session.desc}</div>
                        <div className="live-card-footer">
                            <span>📅 {session.date} · {session.time}</span>
                            <span className="live-attendees">👥 {session.attendees} inscrits</span>
                        </div>

                        {/* Actions */}
                        <div style={{
                            display: 'flex', gap: '.5rem', marginTop: '1rem',
                            paddingTop: '1rem', borderTop: '1px solid var(--border)',
                            flexWrap: 'wrap',
                        }}>
                            <button className="action-btn edit">✏️ Modifier</button>
                            <button className="action-btn">📣 Notifier inscrits</button>
                            <button className="action-btn" style={{ marginLeft: 'auto' }}>🔗 Lien</button>
                            <button className="action-btn del">🗑</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── SESSIONS PASSÉES ── */}
            <div style={{ marginBottom: '1rem', fontSize: '.95rem', fontWeight: 700, color: 'var(--text)' }}>
                🗂 Sessions passées
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="full-table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Cours</th>
                                <th>Date</th>
                                <th>Durée</th>
                                <th>Participants</th>
                                <th>Enregistrement</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PAST.map(session => (
                                <tr key={session.id}>
                                    <td style={{ fontWeight: 600, fontSize: '.83rem' }}>{session.title}</td>
                                    <td>
                                        <span style={{
                                            fontSize: '.72rem', fontWeight: 700,
                                            background: 'var(--primary-l)', color: 'var(--primary)',
                                            padding: '.15rem .55rem', borderRadius: '999px',
                                        }}>
                                            {session.course}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{session.date}</td>
                                    <td style={{ fontSize: '.78rem', fontWeight: 600 }}>{session.duration}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                                            <span style={{ fontWeight: 700 }}>{session.participants}</span>
                                            <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>participants</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="action-btn edit">▶ Replay</button>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '.35rem' }}>
                                            <button className="action-btn">📤 Partager</button>
                                            <button className="action-btn del">🗑</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── MODAL NOUVELLE SESSION ── */}
            {showModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 100,
                        background: 'rgba(0,0,0,.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem',
                    }}
                    onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
                >
                    <div style={{
                        background: 'var(--surface, #fff)',
                        borderRadius: 20,
                        padding: '2rem',
                        width: '100%', maxWidth: 540,
                        maxHeight: '90vh', overflowY: 'auto',
                        boxShadow: '0 24px 64px rgba(0,0,0,.2)',
                    }}>
                        {/* Header modal */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text, #1e1b4b)' }}>
                                    🔴 Planifier une session live
                                </div>
                                <div style={{ fontSize: '.78rem', color: 'var(--muted, #6b7280)', marginTop: '.25rem' }}>
                                    Remplissez les informations de votre prochaine session
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'none', border: 'none', fontSize: '1.4rem',
                                    cursor: 'pointer', color: 'var(--muted)', lineHeight: 1,
                                    padding: '.25rem',
                                }}
                            >×</button>
                        </div>

                        <form onSubmit={handleCreate}>
                            {/* Titre */}
                            <div className="form-group">
                                <label className="form-label">Titre de la session *</label>
                                <input
                                    className="form-input"
                                    placeholder="ex: Workshop – Design System avec Figma"
                                    value={newSession.title}
                                    onChange={updateField('title')}
                                    required
                                />
                            </div>

                            {/* Cours */}
                            <div className="form-group">
                                <label className="form-label">Cours associé *</label>
                                <select
                                    className="form-input"
                                    value={newSession.course}
                                    onChange={updateField('course')}
                                    required
                                >
                                    <option value="" disabled>Choisir un cours…</option>
                                    <option>UI/UX Design Avancé</option>
                                    <option>HTML &amp; CSS Pro</option>
                                    <option>Figma Masterclass</option>
                                    <option>Motion Design</option>
                                </select>
                            </div>

                            {/* Date */}
                            <div className="form-group">
                                <label className="form-label">Date *</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={newSession.date}
                                    onChange={updateField('date')}
                                    required
                                />
                            </div>

                            {/* Horaires */}
                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Heure de début *</label>
                                    <input
                                        className="form-input"
                                        type="time"
                                        value={newSession.timeStart}
                                        onChange={updateField('timeStart')}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Heure de fin *</label>
                                    <input
                                        className="form-input"
                                        type="time"
                                        value={newSession.timeEnd}
                                        onChange={updateField('timeEnd')}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-input"
                                    placeholder="Décrivez le contenu de la session…"
                                    rows={3}
                                    value={newSession.desc}
                                    onChange={updateField('desc')}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            {/* Notification */}
                            <div style={{
                                padding: '.85rem 1rem',
                                background: '#f0f9ff',
                                border: '1px solid #bae6fd',
                                borderRadius: 12,
                                fontSize: '.78rem',
                                color: '#0369a1',
                                marginBottom: '1.25rem',
                            }}>
                                📣 Tous les étudiants inscrits au cours seront automatiquement notifiés par email.
                            </div>

                            {/* Boutons */}
                            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuler
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    🔴 Créer la session
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── STYLES MOBILE ── */}
            <style>{`
        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; gap: .75rem; }
          .page-header .btn { width: 100%; justify-content: center; }

          .live-upcoming { padding: 1.25rem; }
          .live-title    { font-size: 1.05rem; }
          .live-actions  { flex-direction: column; gap: .5rem; }
          .live-actions .lb { width: 100%; text-align: center; justify-content: center; }

          .lives-grid { grid-template-columns: 1fr !important; }

          .live-card-footer { flex-direction: column; align-items: flex-start; gap: .35rem; }
        }

        @media (max-width: 480px) {
          .full-table thead th:nth-child(4),
          .full-table tbody td:nth-child(4),
          .full-table thead th:nth-child(7),
          .full-table tbody td:nth-child(7) { display: none; }
        }
      `}</style>
        </>
    )
}