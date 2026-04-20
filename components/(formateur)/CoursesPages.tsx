'use client'

import { useState } from 'react'

// ── TYPES ──────────────────────────────────────────────────────
type Status = 'published' | 'review' | 'draft'

type Course = {
    id: number
    emoji: string
    thumbClass: string
    title: string
    modules: number
    duration: string
    level: string
    price: number
    status: Status
    stats: {
        students: number
        completion: string
        rating: string
        reviews: number
        revenue: string
    }
}

// ── DONNÉES ────────────────────────────────────────────────────
const COURSES: Course[] = [
    {
        id: 1,
        emoji: '🎨',
        thumbClass: 't1',
        title: 'UI/UX Design Avancé',
        modules: 24,
        duration: '18h de contenu',
        level: 'Avancé',
        price: 89,
        status: 'published',
        stats: { students: 312, completion: '78%', rating: '4.9 ⭐', reviews: 247, revenue: '19 425€' },
    },
    {
        id: 2,
        emoji: '💻',
        thumbClass: 't2',
        title: 'HTML & CSS Professionnel',
        modules: 18,
        duration: '12h de contenu',
        level: 'Débutant',
        price: 49,
        status: 'published',
        stats: { students: 198, completion: '85%', rating: '4.8 ⭐', reviews: 163, revenue: '6 804€' },
    },
    {
        id: 3,
        emoji: '🔴',
        thumbClass: 't4',
        title: 'Figma Masterclass 2025',
        modules: 30,
        duration: '22h de contenu',
        level: 'Intermédiaire',
        price: 79,
        status: 'review',
        stats: { students: 37, completion: '42%', rating: '4.7 ⭐', reviews: 22, revenue: '2 052€' },
    },
    {
        id: 4,
        emoji: '🎬',
        thumbClass: 't3',
        title: 'Design Mobile – React Native',
        modules: 18,
        duration: '— (en cours)',
        level: 'Avancé',
        price: 99,
        status: 'draft',
        stats: { students: 0, completion: '—', rating: '—', reviews: 0, revenue: '—' },
    },
    {
        id: 5,
        emoji: '🖼️',
        thumbClass: 't1',
        title: 'Motion Design & After Effects',
        modules: 14,
        duration: '10h de contenu',
        level: 'Intermédiaire',
        price: 69,
        status: 'published',
        stats: { students: 88, completion: '71%', rating: '4.6 ⭐', reviews: 54, revenue: '4 278€' },
    },
    {
        id: 6,
        emoji: '🧩',
        thumbClass: 't2',
        title: 'Design System avec Figma',
        modules: 10,
        duration: '—',
        level: 'Avancé',
        price: 89,
        status: 'draft',
        stats: { students: 0, completion: '—', rating: '—', reviews: 0, revenue: '—' },
    },
    {
        id: 7,
        emoji: '🎯',
        thumbClass: 't3',
        title: 'UX Research & Tests utilisateurs',
        modules: 16,
        duration: '14h de contenu',
        level: 'Intermédiaire',
        price: 75,
        status: 'published',
        stats: { students: 54, completion: '66%', rating: '4.7 ⭐', reviews: 31, revenue: '2 862€' },
    },
    {
        id: 8,
        emoji: '🖌️',
        thumbClass: 't4',
        title: 'Illustration vectorielle',
        modules: 12,
        duration: '9h de contenu',
        level: 'Débutant',
        price: 44,
        status: 'published',
        stats: { students: 72, completion: '80%', rating: '4.8 ⭐', reviews: 48, revenue: '2 232€' },
    },
]

const STATUS_CONFIG: Record<Status, { label: string; cls: string }> = {
    published: { label: 'Publié', cls: 'sb-pub' },
    review: { label: 'En révision', cls: 'sb-review' },
    draft: { label: 'Brouillon', cls: 'sb-draft' },
}

type Filter = 'all' | Status

// ── COMPOSANT ──────────────────────────────────────────────────
export default function CoursPage() {
    const [filter, setFilter] = useState<Filter>('all')
    const [sort, setSort] = useState('students')
    const [expanded, setExpanded] = useState<number | null>(null)

    // Comptages
    const counts = {
        all: COURSES.length,
        published: COURSES.filter(c => c.status === 'published').length,
        review: COURSES.filter(c => c.status === 'review').length,
        draft: COURSES.filter(c => c.status === 'draft').length,
    }

    // Filtrage + tri
    const visible = COURSES
        .filter(c => filter === 'all' || c.status === filter)
        .sort((a, b) => {
            if (sort === 'revenue') return parseFloat(b.stats.revenue) - parseFloat(a.stats.revenue)
            if (sort === 'rating') return parseFloat(b.stats.rating) - parseFloat(a.stats.rating)
            return b.stats.students - a.stats.students
        })

    const filters: { key: Filter; label: string }[] = [
        { key: 'all', label: `Tous (${counts.all})` },
        { key: 'published', label: `Publiés (${counts.published})` },
        { key: 'review', label: `En révision (${counts.review})` },
        { key: 'draft', label: `Brouillons (${counts.draft})` },
    ]

    return (
        <>
            {/* ── EN-TÊTE ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        Mes <span>Cours</span>
                    </div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                        {counts.all} cours · {COURSES.reduce((s, c) => s + c.stats.students, 0)} étudiants au total
                    </div>
                </div>
                <button className="btn btn-primary">➕ Créer un nouveau cours</button>
            </div>

            {/* ── FILTRES ── */}
            <div className="students-filters" style={{ marginBottom: '1.5rem' }}>
                {filters.map(f => (
                    <button
                        key={f.key}
                        className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
                <select
                    className="select-filter"
                    style={{ marginLeft: 'auto' }}
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="students">Trier par inscrits</option>
                    <option value="revenue">Trier par revenus</option>
                    <option value="rating">Trier par note</option>
                </select>
            </div>

            {/* ── LISTE DES COURS ── */}
            {visible.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
                    <p style={{ fontWeight: 600 }}>Aucun cours dans cette catégorie</p>
                </div>
            ) : (
                <div className="courses-list">
                    {visible.map(course => {
                        const st = STATUS_CONFIG[course.status]
                        const isExpanded = expanded === course.id

                        return (
                            <div key={course.id} className="course-detail-card">

                                {/* ── HEADER CARTE ── */}
                                <div className="cdc-header">
                                    <div className={`cdc-thumb ${course.thumbClass}`}>{course.emoji}</div>

                                    <div className="cdc-info">
                                        <div className="cdc-title">{course.title}</div>
                                        <div className="cdc-meta">
                                            <span className="cdc-meta-item">📚 {course.modules} modules</span>
                                            <span className="cdc-meta-item">⏱ {course.duration}</span>
                                            <span className="cdc-meta-item">🎯 {course.level}</span>
                                            <span className="cdc-meta-item">💰 {course.price}€</span>
                                        </div>
                                    </div>

                                    <div className="cdc-actions">
                                        <span className={`status-badge ${st.cls}`}>{st.label}</span>
                                        <button className="action-btn edit">✏️ Éditer</button>
                                        <button
                                            className="action-btn"
                                            onClick={() => setExpanded(isExpanded ? null : course.id)}
                                            style={{ minWidth: 80 }}
                                        >
                                            {isExpanded ? '▲ Réduire' : '📊 Stats'}
                                        </button>
                                        <button className="action-btn del">🗑</button>
                                    </div>
                                </div>

                                {/* ── STATS (accordéon) ── */}
                                {isExpanded && (
                                    <div className="cdc-body">
                                        <div className="cdc-stat">
                                            <div className="cdc-stat-val">{course.stats.students}</div>
                                            <div className="cdc-stat-lbl">Inscrits</div>
                                        </div>
                                        <div className="cdc-stat">
                                            <div className="cdc-stat-val">{course.stats.completion}</div>
                                            <div className="cdc-stat-lbl">Complétion</div>
                                        </div>
                                        <div className="cdc-stat">
                                            <div className="cdc-stat-val">{course.stats.rating}</div>
                                            <div className="cdc-stat-lbl">Note</div>
                                        </div>
                                        <div className="cdc-stat">
                                            <div className="cdc-stat-val">{course.stats.reviews}</div>
                                            <div className="cdc-stat-lbl">Avis</div>
                                        </div>
                                        <div className="cdc-stat">
                                            <div
                                                className="cdc-stat-val"
                                                style={{ color: course.stats.revenue === '—' ? 'var(--muted)' : 'var(--success)' }}
                                            >
                                                {course.stats.revenue}
                                            </div>
                                            <div className="cdc-stat-lbl">Revenus</div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    })}
                </div>
            )}

            {/* ── STYLES MOBILE INLINE (complément dashboard.css) ── */}
            <style>{`
        /* Stats toujours visibles sur mobile en grille 2 col */
        @media (max-width: 600px) {
          .cdc-header {
            flex-wrap: wrap;
            gap: .75rem;
          }
          .cdc-thumb {
            width: 48px !important;
            height: 48px !important;
            font-size: 1.3rem !important;
          }
          .cdc-info { flex: 1 1 0; min-width: 0; }
          .cdc-title { font-size: .88rem; }
          .cdc-meta  { gap: .4rem .75rem; }
          .cdc-actions {
            width: 100%;
            flex-wrap: wrap;
            gap: .4rem;
          }
          .cdc-body {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: .6rem;
            padding: .75rem 1rem;
          }
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: .75rem;
          }
          .page-header .btn {
            width: 100%;
            justify-content: center;
          }
          .students-filters {
            gap: .4rem;
          }
          .select-filter {
            margin-left: 0 !important;
            width: 100%;
          }
        }
      `}</style>
        </>
    )
}