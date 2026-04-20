'use client'

import { useState } from 'react'
import Link from 'next/link'

type Course = {
    id: number
    icon: string
    iconClass: string
    title: string
    subtitle: string
    chapters: number
    level: 'débutant' | 'intermédiaire' | 'avancé'
    description: string
    topics: string[]
}

const COURSES: Course[] = [
    {
        id: 1,
        icon: '🌐',
        iconClass: 'web',
        title: 'Développement Web',
        subtitle: 'HTML, CSS, JavaScript, React',
        chapters: 3,
        level: 'débutant',
        description: 'Maîtrisez les fondamentaux du développement web moderne, de la structure HTML aux interfaces React dynamiques.',
        topics: ['HTML & CSS', 'JavaScript ES6+', 'React', 'Responsive Design'],
    },
    {
        id: 2,
        icon: '📊',
        iconClass: 'data',
        title: 'Data Science',
        subtitle: 'Python, Machine Learning',
        chapters: 2,
        level: 'intermédiaire',
        description: 'Analysez des données, construisez des modèles prédictifs et maîtrisez l\'écosystème Python data.',
        topics: ['Python', 'Pandas & NumPy', 'Machine Learning', 'Visualisation'],
    },
    {
        id: 3,
        icon: '🎨',
        iconClass: 'uiux',
        title: 'UI/UX Design',
        subtitle: 'Figma, UX moderne',
        chapters: 1,
        level: 'débutant',
        description: 'Concevez des interfaces intuitives et esthétiques en maîtrisant Figma et les principes UX.',
        topics: ['Figma', 'Design System', 'Prototypage', 'UX Research'],
    },
]

const FILTERS = ['all', 'débutant', 'intermédiaire', 'avancé'] as const

export default function CoursesPage() {
    const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<Course | null>(null)
    const [showModal, setShowModal] = useState(false)

    // TODO: remplace par ton vrai état d'auth (ex: useSession de NextAuth)
    const isLoggedIn = false

    const visible = COURSES.filter(c => {
        const matchLevel = filter === 'all' || c.level === filter
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
        return matchLevel && matchSearch
    })

    function handleEnroll() {
        if (!isLoggedIn) setShowModal(true)
        else { /* rediriger vers le cours */ }
    }

    return (
        <>
            {/* HEADER */}
            <div className="courses-header">
                <div className="header-tag">Catalogue 2026</div>
                <h1>Nos <em>formations</em><br />professionnelles</h1>
                <p>Trouvez la formation qui correspond à votre objectif</p>

                <div className="search-bar-wrap">
                    <div className="search-box">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher une formation..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-pills">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={`pill ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f === 'all' ? 'Tous' : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <section className="courses-container">
                {/* LISTE */}
                <div className="course-list" id="courseList">
                    <div className="list-label">{visible.length} formation{visible.length > 1 ? 's' : ''} disponible{visible.length > 1 ? 's' : ''}</div>

                    {visible.map(course => (
                        <div
                            key={course.id}
                            className={`course-card ${selected?.id === course.id ? 'active' : ''}`}
                            onClick={() => setSelected(course)}
                        >
                            <div className={`card-icon ${course.iconClass}`}>{course.icon}</div>
                            <div className="card-text">
                                <h3>{course.title}</h3>
                                <p>{course.subtitle}</p>
                            </div>
                            <div className="card-meta">
                                <span className="chapter-count">{course.chapters} chapitre{course.chapters > 1 ? 's' : ''}</span>
                                <span className="difficulty">{course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DETAILS */}
                <div className="course-details" id="courseDetails">
                    {selected ? (
                        <div className="details-content">
                            <div className={`details-icon ${selected.iconClass}`}>{selected.icon}</div>
                            <h2>{selected.title}</h2>
                            <p className="details-desc">{selected.description}</p>

                            <div className="details-meta">
                                <span>{selected.chapters} chapitre{selected.chapters > 1 ? 's' : ''}</span>
                                <span>{selected.level.charAt(0).toUpperCase() + selected.level.slice(1)}</span>
                            </div>

                            <div className="details-topics">
                                <h4>Au programme</h4>
                                <ul>
                                    {selected.topics.map(t => <li key={t}>✓ {t}</li>)}
                                </ul>
                            </div>

                            <button className="btn-enroll" onClick={handleEnroll}>
                                Commencer la formation →
                            </button>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p>Sélectionnez une formation<br />pour voir son contenu</p>
                        </div>
                    )}
                </div>
            </section>

            {/* MODAL */}
            {showModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <div className="modal-icon">🔒</div>
                        <h3>Accès restreint</h3>
                        <p>Vous devez être connecté pour suivre cette formation.</p>
                        <div className="modal-actions">
                            <Link href="/login" className="modal-btn-primary">Se connecter</Link>
                            <button className="modal-btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}