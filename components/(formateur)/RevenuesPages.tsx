'use client'

import { useState } from 'react'

// ── DONNÉES ────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

const CHART_DATA: Record<string, number[]> = {
    '2026': [30, 45, 38, 65, 55, 48, 72, 60, 80, 68, 90, 75],
    '2025': [20, 28, 35, 40, 42, 55, 50, 62, 58, 70, 65, 80],
}

const COURSE_BREAKDOWN = [
    { name: 'UI/UX Avancé', color: 'var(--primary)', pct: 74, amount: '19 425€' },
    { name: 'HTML & CSS Pro', color: 'var(--accent)', pct: 26, amount: '6 804€' },
    { name: 'Figma Masterclass', color: 'var(--warning)', pct: 8, amount: '2 052€' },
    { name: 'Motion Design', color: 'var(--success)', pct: 16, amount: '4 278€' },
]

const PAYMENTS = [
    { id: 1, icon: '💳', iconCls: 'pi-g', course: 'UI/UX Avancé', student: 'Koffi Mensah', amount: '+62.30€', date: '12 Avr', status: 'ok' },
    { id: 2, icon: '💳', iconCls: 'pi-g', course: 'HTML & CSS Pro', student: 'Eva Nkosi', amount: '+34.30€', date: '11 Avr', status: 'ok' },
    { id: 3, icon: '⏳', iconCls: 'pi-y', course: 'Figma Masterclass', student: 'Sara Lima', amount: '+55.30€', date: '10 Avr', status: 'pending' },
    { id: 4, icon: '💳', iconCls: 'pi-g', course: 'UI/UX Avancé', student: 'Yann Diallo', amount: '+62.30€', date: '9 Avr', status: 'ok' },
    { id: 5, icon: '💳', iconCls: 'pi-g', course: 'HTML & CSS Pro', student: 'Amara Bah', amount: '+34.30€', date: '8 Avr', status: 'ok' },
    { id: 6, icon: '💳', iconCls: 'pi-g', course: 'Motion Design', student: 'Omar Touré', amount: '+48.30€', date: '7 Avr', status: 'ok' },
    { id: 7, icon: '❌', iconCls: 'pi-r', course: 'UI/UX Avancé', student: 'Nadia Sow', amount: '+62.30€', date: '6 Avr', status: 'refund' },
]

// Historique des virements
const TRANSFERS = [
    { id: 1, month: 'Mars 2026', amount: '2 184€', date: '1 Avr 2026', status: 'ok' },
    { id: 2, month: 'Février 2026', amount: '1 960€', date: '1 Mar 2026', status: 'ok' },
    { id: 3, month: 'Janvier 2026', amount: '1 750€', date: '1 Fév 2026', status: 'ok' },
    { id: 4, month: 'Déc. 2025', amount: '2 310€', date: '1 Jan 2026', status: 'ok' },
]

// ── COMPOSANT ──────────────────────────────────────────────────
export default function RevenusPages() {
    const [year, setYear] = useState('2026')
    const [hoveredBar, setHoveredBar] = useState<number | null>(null)

    const data = CHART_DATA[year]
    const maxVal = Math.max(...data)

    // Valeurs mensuelles fictives pour le tooltip
    const monthlyEuros = [480, 720, 610, 1470, 880, 770, 1150, 960, 1280, 1090, 1440, 1200]

    return (
        <>
            {/* ── EN-TÊTE ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">Mes <span>Revenus</span></div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                        Part formateur : 70% · Virement mensuel le 1er du mois
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-outline">📊 Rapport fiscal</button>
                    <button className="btn btn-outline">📥 Télécharger relevé</button>
                </div>
            </div>

            {/* ── CARDS KPI ── */}
            <div className="revenue-cards" style={{ marginBottom: '1.75rem' }}>
                <div className="rev-card">
                    <div className="rev-label">Revenus totaux (brut)</div>
                    <div className="rev-value">26 057€</div>
                    <div className="rev-change up">↑ 12.4% vs 2025</div>
                </div>
                <div className="rev-card">
                    <div className="rev-label">Part formateur (70%)</div>
                    <div className="rev-value">18 240€</div>
                    <div className="rev-change up">↑ En progression</div>
                </div>
                <div className="rev-card">
                    <div className="rev-label">Ce mois (avril)</div>
                    <div className="rev-value">1 470€</div>
                    <div className="rev-change up">↑ 8.1% vs mars</div>
                </div>
                <div className="rev-card">
                    <div className="rev-label">Prochain virement</div>
                    <div className="rev-value">1 470€</div>
                    <div className="rev-change" style={{ color: 'var(--muted)' }}>📅 1er mai 2026</div>
                </div>
            </div>

            {/* ── GRAPHIQUE + PAIEMENTS ── */}
            <div className="revenue-layout" style={{ marginBottom: '1.75rem' }}>

                {/* GRAPHIQUE */}
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">📈 Revenus par mois</div>
                        <select
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            style={{
                                fontSize: '.75rem', border: '1.5px solid var(--border)',
                                borderRadius: 8, padding: '.2rem .5rem',
                                fontFamily: 'inherit', color: 'var(--muted)',
                                background: 'var(--surface)', cursor: 'pointer',
                            }}
                        >
                            <option>2026</option>
                            <option>2025</option>
                        </select>
                    </div>

                    {/* Barres interactives */}
                    <div style={{ position: 'relative' }}>
                        <div className="big-chart" style={{ gap: '.5rem', alignItems: 'flex-end', height: 140 }}>
                            {data.map((val, i) => (
                                <div
                                    key={i}
                                    style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                    onMouseEnter={() => setHoveredBar(i)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                >
                                    {/* Tooltip */}
                                    {hoveredBar === i && (
                                        <div style={{
                                            position: 'absolute', bottom: '100%', left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'var(--text)', color: '#fff',
                                            fontSize: '.65rem', fontWeight: 700,
                                            padding: '.3rem .6rem', borderRadius: 8,
                                            whiteSpace: 'nowrap', marginBottom: 4, zIndex: 10,
                                        }}>
                                            {monthlyEuros[i]}€
                                        </div>
                                    )}
                                    <div
                                        className={`bc-bar${i === 3 ? ' hi' : ''}`}
                                        style={{
                                            height: `${(val / maxVal) * 100}%`,
                                            width: '100%',
                                            borderRadius: '6px 6px 0 0',
                                            transition: 'filter .2s, transform .2s',
                                            filter: hoveredBar === i ? 'brightness(1.15)' : 'brightness(1)',
                                            transform: hoveredBar === i ? 'scaleY(1.04)' : 'scaleY(1)',
                                            transformOrigin: 'bottom',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="bc-labels" style={{ gap: '.5rem', marginTop: '.5rem' }}>
                            {MONTHS.map(m => (
                                <span key={m} className="bc-label">{m}</span>
                            ))}
                        </div>
                    </div>

                    {/* Répartition par cours */}
                    <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.85rem' }}>
                            Répartition par cours
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
                            {COURSE_BREAKDOWN.map(c => (
                                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                                    <div style={{ flex: 1, fontSize: '.8rem', color: 'var(--text)' }}>{c.name}</div>
                                    <div style={{ width: 100, height: 6, background: 'var(--border)', borderRadius: 999, overflow: 'hidden', flexShrink: 0 }}>
                                        <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: 999 }} />
                                    </div>
                                    <div style={{ fontSize: '.8rem', fontWeight: 700, minWidth: 60, textAlign: 'right', color: 'var(--success)' }}>
                                        {c.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DERNIERS PAIEMENTS */}
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">💳 Derniers paiements</div>
                        <button className="card-action">Voir tout</button>
                    </div>

                    {PAYMENTS.map(p => (
                        <div key={p.id} className="payment-row">
                            <div className={`pay-icon ${p.iconCls}`}>{p.icon}</div>
                            <div className="pay-info">
                                <div className="pay-course">{p.course}</div>
                                <div className="pay-student">{p.student}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div
                                    className="pay-amount"
                                    style={{
                                        color: p.status === 'pending' ? 'var(--warning)'
                                            : p.status === 'refund' ? 'var(--danger)'
                                                : 'var(--success)',
                                    }}
                                >
                                    {p.status === 'refund' ? '-' : ''}{p.amount}
                                </div>
                                <div className="pay-date">{p.date}</div>
                            </div>
                        </div>
                    ))}

                    {/* IBAN */}
                    <div style={{
                        marginTop: '1rem', padding: '.85rem',
                        background: 'var(--bg)', borderRadius: 12,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>IBAN enregistré</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '.78rem', fontWeight: 700, color: 'var(--text)' }}>
                            FR76 ···· ···· 4821
                        </div>
                    </div>
                </div>
            </div>

            {/* ── HISTORIQUE DES VIREMENTS ── */}
            <div className="card">
                <div className="card-header">
                    <div className="card-title">🏦 Historique des virements</div>
                    <button className="card-action">Télécharger tout</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="full-table">
                        <thead>
                            <tr>
                                <th>Période</th>
                                <th>Montant net (70%)</th>
                                <th>Date de virement</th>
                                <th>Statut</th>
                                <th>Justificatif</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TRANSFERS.map(t => (
                                <tr key={t.id}>
                                    <td style={{ fontWeight: 600, fontSize: '.83rem' }}>{t.month}</td>
                                    <td style={{ fontWeight: 700, color: 'var(--success)', fontSize: '.88rem' }}>{t.amount}</td>
                                    <td style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{t.date}</td>
                                    <td>
                                        <span className="status-badge sb-pub">✅ Viré</span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit">📄 Reçu</button>
                                    </td>
                                </tr>
                            ))}
                            {/* Prochain virement */}
                            <tr style={{ background: 'rgba(79,70,229,.03)' }}>
                                <td style={{ fontWeight: 600, fontSize: '.83rem' }}>Avril 2026</td>
                                <td style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '.88rem' }}>1 470€</td>
                                <td style={{ fontSize: '.78rem', color: 'var(--muted)' }}>1 Mai 2026</td>
                                <td>
                                    <span className="status-badge sb-draft">⏳ En attente</span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>Disponible le 1er mai</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── STYLES MOBILE ── */}
            <style>{`
        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; gap: .75rem; }
          .page-header > div:last-child { width: 100%; display: flex; gap: .5rem; }
          .page-header .btn { flex: 1; justify-content: center; font-size: .78rem; }
          .revenue-cards { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
          .revenue-layout { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .revenue-cards { grid-template-columns: 1fr; }
          .rev-value { font-size: 1.35rem; }

          /* Cache colonnes secondaires dans l'historique */
          .full-table thead th:nth-child(5),
          .full-table tbody td:nth-child(5) { display: none; }

          /* Répartition par cours : barre plus courte */
          .bc-label { font-size: .55rem; }
        }
      `}</style>
        </>
    )
}