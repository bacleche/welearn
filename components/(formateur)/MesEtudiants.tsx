'use client'

import { useState, useMemo } from 'react'

// ── TYPES ──────────────────────────────────────────────────────
type Grade = 'A+' | 'A' | 'B' | 'C' | 'F' | '—'
type StudentStatus = 'active' | 'completed' | 'inactive'

type Student = {
    id: number
    initials: string
    avatarClass: string
    name: string
    email: string
    course: string
    enrolledAt: string
    progress: number
    lastActivity: string
    grade: Grade
    certificate: boolean
    status: StudentStatus
}

// ── DONNÉES ────────────────────────────────────────────────────
const STUDENTS: Student[] = [
    { id: 1, initials: 'AB', avatarClass: 's-a2', name: 'Amara Bah', email: 'amara@email.com', course: 'HTML & CSS Pro', enrolledAt: '5 Jan 2026', progress: 92, lastActivity: "Aujourd'hui", grade: 'A+', certificate: true, status: 'completed' },
    { id: 2, initials: 'EN', avatarClass: 's-a5', name: 'Eva Nkosi', email: 'eva@email.com', course: 'HTML & CSS Pro', enrolledAt: '12 Jan 2026', progress: 85, lastActivity: 'Hier', grade: 'A', certificate: false, status: 'active' },
    { id: 3, initials: 'KM', avatarClass: 's-a1', name: 'Koffi Mensah', email: 'koffi@email.com', course: 'UI/UX Avancé', enrolledAt: '20 Jan 2026', progress: 78, lastActivity: 'Il y a 2j', grade: 'A', certificate: false, status: 'active' },
    { id: 4, initials: 'SL', avatarClass: 's-a3', name: 'Sara Lima', email: 'sara@email.com', course: 'UI/UX Avancé', enrolledAt: '3 Fév 2026', progress: 61, lastActivity: 'Il y a 4j', grade: 'B', certificate: false, status: 'active' },
    { id: 5, initials: 'YD', avatarClass: 's-a4', name: 'Yann Diallo', email: 'yann@email.com', course: 'Figma Masterclass', enrolledAt: '15 Fév 2026', progress: 45, lastActivity: 'Il y a 1sem', grade: 'C', certificate: false, status: 'inactive' },
    { id: 6, initials: 'ML', avatarClass: 's-a1', name: 'Marie Longo', email: 'marie@email.com', course: 'UI/UX Avancé', enrolledAt: '1 Fév 2026', progress: 100, lastActivity: 'Il y a 3j', grade: 'A+', certificate: true, status: 'completed' },
    { id: 7, initials: 'PA', avatarClass: 's-a2', name: 'Pierre Ake', email: 'pierre@email.com', course: 'HTML & CSS Pro', enrolledAt: '10 Fév 2026', progress: 55, lastActivity: 'Il y a 5j', grade: 'B', certificate: false, status: 'active' },
    { id: 8, initials: 'FC', avatarClass: 's-a3', name: 'Fatou Camara', email: 'fatou@email.com', course: 'Figma Masterclass', enrolledAt: '18 Fév 2026', progress: 30, lastActivity: 'Il y a 2sem', grade: 'C', certificate: false, status: 'inactive' },
    { id: 9, initials: 'OT', avatarClass: 's-a4', name: 'Omar Touré', email: 'omar@email.com', course: 'UI/UX Avancé', enrolledAt: '22 Fév 2026', progress: 72, lastActivity: 'Il y a 1j', grade: 'A', certificate: false, status: 'active' },
    { id: 10, initials: 'LB', avatarClass: 's-a5', name: 'Léa Bouchard', email: 'lea@email.com', course: 'HTML & CSS Pro', enrolledAt: '28 Fév 2026', progress: 100, lastActivity: 'Il y a 6j', grade: 'A+', certificate: true, status: 'completed' },
    { id: 11, initials: 'DK', avatarClass: 's-a1', name: 'David Koné', email: 'david@email.com', course: 'Figma Masterclass', enrolledAt: '5 Mar 2026', progress: 68, lastActivity: 'Il y a 3j', grade: 'B', certificate: false, status: 'active' },
    { id: 12, initials: 'NS', avatarClass: 's-a2', name: 'Nadia Sow', email: 'nadia@email.com', course: 'UI/UX Avancé', enrolledAt: '8 Mar 2026', progress: 20, lastActivity: 'Il y a 3sem', grade: 'F', certificate: false, status: 'inactive' },
]

const GRADE_CLASS: Record<Grade, string> = {
    'A+': 'g-a', 'A': 'g-a', 'B': 'g-b', 'C': 'g-c', 'F': 'g-f', '—': ''
}

const COURSES = ['Tous les cours', 'UI/UX Avancé', 'HTML & CSS Pro', 'Figma Masterclass']

const PER_PAGE = 8

// ── COMPOSANT ──────────────────────────────────────────────────
export default function EtudiantsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | StudentStatus>('all')
    const [courseFilter, setCourseFilter] = useState('Tous les cours')
    const [sortBy, setSortBy] = useState('progress')
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<number[]>([])

    // ── Filtrage + tri ──
    const filtered = useMemo(() => {
        return STUDENTS
            .filter(s => {
                const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.email.toLowerCase().includes(search.toLowerCase())
                const matchStatus = statusFilter === 'all' || s.status === statusFilter
                const matchCourse = courseFilter === 'Tous les cours' || s.course === courseFilter
                return matchSearch && matchStatus && matchCourse
            })
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name)
                if (sortBy === 'date') return b.id - a.id
                if (sortBy === 'grade') return b.progress - a.progress
                return b.progress - a.progress
            })
    }, [search, statusFilter, courseFilter, sortBy])

    // ── Pagination ──
    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const counts = {
        all: STUDENTS.length,
        active: STUDENTS.filter(s => s.status === 'active').length,
        completed: STUDENTS.filter(s => s.status === 'completed').length,
        inactive: STUDENTS.filter(s => s.status === 'inactive').length,
    }

    // ── Sélection ──
    function toggleSelect(id: number) {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }
    function toggleAll() {
        if (selected.length === paginated.length) setSelected([])
        else setSelected(paginated.map(s => s.id))
    }

    const filters: { key: 'all' | StudentStatus; label: string }[] = [
        { key: 'all', label: `Tous (${counts.all})` },
        { key: 'active', label: `Actifs (${counts.active})` },
        { key: 'completed', label: `Complétés (${counts.completed})` },
        { key: 'inactive', label: `Inactifs (${counts.inactive})` },
    ]

    return (
        <>
            {/* ── EN-TÊTE ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">Mes <span>Étudiants</span></div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                        {STUDENTS.length} étudiants inscrits à vos cours
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                    {selected.length > 0 && (
                        <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                            ✉️ Envoyer message ({selected.length})
                        </button>
                    )}
                    <button className="btn btn-outline">📤 Exporter CSV</button>
                </div>
            </div>

            {/* ── FILTRES ── */}
            <div className="students-filters">
                {/* Recherche */}
                <div className="search-filter">
                    <span>🔍</span>
                    <input
                        placeholder="Rechercher un étudiant…"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1) }}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1rem', lineHeight: 1 }}
                        >×</button>
                    )}
                </div>

                {/* Statuts */}
                {filters.map(f => (
                    <button
                        key={f.key}
                        className={`filter-btn ${statusFilter === f.key ? 'active' : ''}`}
                        onClick={() => { setStatusFilter(f.key); setPage(1) }}
                    >
                        {f.label}
                    </button>
                ))}

                {/* Cours */}
                <select
                    className="select-filter"
                    value={courseFilter}
                    onChange={e => { setCourseFilter(e.target.value); setPage(1) }}
                >
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                </select>

                {/* Tri */}
                <select
                    className="select-filter"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="progress">Trier par progression</option>
                    <option value="name">Trier par nom</option>
                    <option value="date">Trier par date</option>
                    <option value="grade">Trier par note</option>
                </select>
            </div>

            {/* ── TABLEAU ── */}
            {filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                    <p style={{ fontWeight: 600 }}>Aucun étudiant trouvé</p>
                    <p style={{ fontSize: '.85rem', marginTop: '.5rem' }}>Essayez de modifier vos filtres</p>
                </div>
            ) : (
                <div className="students-table-wrap">
                    <table className="full-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>
                                    <input
                                        type="checkbox"
                                        checked={selected.length === paginated.length && paginated.length > 0}
                                        onChange={toggleAll}
                                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                                    />
                                </th>
                                <th>Étudiant</th>
                                <th>Cours suivi</th>
                                <th>Inscription</th>
                                <th>Progression</th>
                                <th>Dernière activité</th>
                                <th>Note</th>
                                <th>Certificat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(student => (
                                <tr
                                    key={student.id}
                                    style={{ background: selected.includes(student.id) ? 'rgba(79,70,229,.04)' : undefined }}
                                >
                                    {/* Checkbox */}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(student.id)}
                                            onChange={() => toggleSelect(student.id)}
                                            style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                                        />
                                    </td>

                                    {/* Étudiant */}
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
                                            <div className={`t-avatar ${student.avatarClass}`}>{student.initials}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '.83rem' }}>{student.name}</div>
                                                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{student.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Cours */}
                                    <td style={{ fontSize: '.8rem' }}>{student.course}</td>

                                    {/* Date */}
                                    <td style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{student.enrolledAt}</td>

                                    {/* Progression */}
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                                            <div className="prog-bar">
                                                <div
                                                    className="prog-fill"
                                                    style={{
                                                        width: `${student.progress}%`,
                                                        background: student.progress === 100
                                                            ? 'linear-gradient(90deg,var(--success),#34d399)'
                                                            : student.progress < 40
                                                                ? 'linear-gradient(90deg,var(--danger),#f87171)'
                                                                : 'linear-gradient(90deg,var(--primary),var(--accent))',
                                                    }}
                                                />
                                            </div>
                                            <span style={{
                                                fontSize: '.72rem', fontWeight: 700,
                                                color: student.progress === 100 ? 'var(--success)'
                                                    : student.progress < 40 ? 'var(--danger)'
                                                        : 'var(--primary)',
                                            }}>
                                                {student.progress}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Dernière activité */}
                                    <td>
                                        <span style={{
                                            fontSize: '.78rem',
                                            color: student.lastActivity === "Aujourd'hui" || student.lastActivity === 'Hier'
                                                ? 'var(--success)' : 'var(--muted)',
                                            fontWeight: student.lastActivity === "Aujourd'hui" ? 600 : 400,
                                        }}>
                                            {student.lastActivity}
                                        </span>
                                    </td>

                                    {/* Note */}
                                    <td>
                                        {student.grade === '—'
                                            ? <span style={{ color: 'var(--muted)', fontSize: '.8rem' }}>—</span>
                                            : <span className={`grade-pill ${GRADE_CLASS[student.grade]}`}>{student.grade}</span>
                                        }
                                    </td>

                                    {/* Certificat */}
                                    <td>
                                        {student.certificate
                                            ? <span style={{ fontSize: '.72rem', color: 'var(--success)', fontWeight: 600 }}>✅ Émis</span>
                                            : <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>—</span>
                                        }
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <div style={{ display: 'flex', gap: '.35rem' }}>
                                            <button className="action-btn">✉️</button>
                                            <button className="action-btn">👁</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ── PAGINATION ── */}
                    <div className="pagination">
                        <div className="pag-info">
                            Affichage {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length} étudiant{filtered.length > 1 ? 's' : ''}
                            {selected.length > 0 && (
                                <span style={{ marginLeft: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
                                    {selected.length} sélectionné{selected.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <div className="pag-btns">
                            <button
                                className="pag-btn"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                style={{ opacity: page === 1 ? .4 : 1 }}
                            >←</button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    className={`pag-btn ${page === p ? 'active' : ''}`}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            ))}

                            <button
                                className="pag-btn"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                style={{ opacity: page === totalPages ? .4 : 1 }}
                            >→</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── STYLES MOBILE ── */}
            <style>{`
        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; gap: .75rem; }
          .page-header > div:last-child { width: 100%; }
          .page-header .btn { flex: 1; justify-content: center; }
          .students-filters { flex-wrap: wrap; }
          .search-filter { flex: 1 1 100%; max-width: 100%; }
          .select-filter { flex: 1 1 calc(50% - .375rem); }
        }

        @media (max-width: 600px) {
          /* Masquer colonnes secondaires sur très petit écran */
          .full-table thead th:nth-child(4),
          .full-table tbody td:nth-child(4),
          .full-table thead th:nth-child(6),
          .full-table tbody td:nth-child(6),
          .full-table thead th:nth-child(8),
          .full-table tbody td:nth-child(8) {
            display: none;
          }
          .prog-bar { width: 60px !important; }
          .pagination { flex-direction: column; gap: .75rem; align-items: flex-start; }
        }
      `}</style>
        </>
    )
}