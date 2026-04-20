'use client'

import { usePathname } from 'next/navigation'
import type { SidebarConfig } from '../(formateur)/SidebarConfig'
type Props = {
    config: SidebarConfig
    onMenuClick: () => void
}

// Titre dynamique selon la route
function getTitle(pathname: string): string {
    const map: Record<string, string> = {
        '/formateur': 'Tableau de bord **Formateur**',
        '/formateur/mes_cours': 'Mes **Cours**',
        '/formateur/mes_etudiants': 'Mes **Étudiants**',
        '/formateur/revenus': 'Mes **Revenus**',
        '/formateur/mon_live': 'Sessions **Live**',
        '/formateur/messages': '**Messages**',
        '/formateur/profilFormateur': 'Mon **Profil**',
        '/admin': 'Tableau de bord **Admin**',
        '/student': 'Mon **Espace**',
        '/student/cours': 'Mes **Cours**',
    }
    return map[pathname] || 'Dashboard'
}

export default function Topbar({ config, onMenuClick }: Props) {
    const pathname = usePathname()
    const rawTitle = getTitle(pathname)

    // Convertit **texte** en <span>texte</span>
    const titleHtml = rawTitle.replace(/\*\*(.+?)\*\*/g, '<span>$1</span>')

    return (
        <div className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Hamburger mobile */}
                <button
                    id="hamburgerBtn"
                    className="icon-btn"
                    onClick={onMenuClick}
                    style={{ display: 'flex' }}
                    aria-label="Menu"
                >
                    ☰
                </button>
                <div
                    className="topbar-title"
                    dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
            </div>

            <div className="topbar-right">
                <button className="btn-create">
                    <span>＋</span> Nouveau cours
                </button>
                <div className="icon-btn">
                    🔔
                    <span className="notif-dot" />
                </div>
                <div className="icon-btn">⚙️</div>
            </div>
        </div>
    )
}