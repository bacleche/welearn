'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'


import type { SidebarConfig } from '../(formateur)/SidebarConfig'

type Props = {
    config: SidebarConfig
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ config, isOpen, onClose }: Props) {
    const pathname = usePathname()
    const router = useRouter()

    function handleLogout() {
        // TODO: appel API logout / signOut NextAuth
        router.push('/login')
    }

    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div
                    className="sidebar-overlay open"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Logo */}
                <div className="sidebar-logo">
                    <div className="logo-text">
                        <svg width="100%" viewBox="0 0 320 72" xmlns="http://www.w3.org/2000/svg" aria-label="weLearn">
                            <g transform="translate(36, 36)">
                                <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <circle cx="0" cy="0" r="28" fill="none" stroke="#ffffff" strokeWidth="2"
                                    strokeDasharray="132 176" strokeDashoffset="44"
                                    strokeLinecap="round"
                                    transform="rotate(-90)" />
                                <circle cx="0" cy="0" r="20" fill="rgba(255,255,255,0.15)" />
                                <polyline points="-7,1 -2,7 8,-6" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="15" cy="-23" r="2" fill="#ffffff" />
                            </g>

                            {/* Séparateur */}
                            <rect x="77" y="18" width="0.8" height="36" fill="rgba(255,255,255,0.3)" />

                            {/* we */}
                            <text x="86" y="47" fontFamily="'DM Sans', sans-serif" fontSize="28" fontWeight="700" fill="#ffffff" letterSpacing="-0.5">we</text>

                            {/* Learn */}
                            <text x="118" y="47" fontFamily="'DM Sans', sans-serif" fontSize="28" fontWeight="300" fill="#ffffff" letterSpacing="-0.5">Learn</text>
                        </svg>
                    </div>
                    <div className="logo-sub">Plateforme | ICONNECT </div>
                </div>

                {/* User */}
                <div className="sidebar-user">
                    <div className="avatar">{config.initials}</div>
                    <div>
                        <div className="user-name">{config.userName}</div>
                        <span className="badge-role">{config.roleLabel}</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav>
                    {config.sections.map(section => (
                        <div key={section.title}>
                            <div className="nav-section">{section.title}</div>
                            {section.items.map(item => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' + config.role && pathname.startsWith(item.href))

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`nav-item ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            if (window.innerWidth <= 768) onClose()
                                        }}
                                    >
                                        <span className="icon">{item.icon}</span>
                                        {item.label}
                                        {item.badge && (
                                            <span className="nav-badge">{item.badge}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span>🚪</span>
                        Se déconnecter
                    </button>
                </div>
            </aside>
        </>
    )
}