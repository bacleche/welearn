'use client'

import { useState } from 'react'
import Sidebar from '@/components/object_formateur/Sidebar'
import Topbar from '@/components/object_formateur/Topbar'
import { formateurNav } from '@/components/(formateur)/SidebarConfig'
// TODO: remplace formateurNav par le bon config selon le rôle de l'utilisateur connecté
// ex: const config = user.role === 'admin' ? adminNav : user.role === 'student' ? studentNav : formateurNav
import '../../dashboard.css'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh'}}>
            <Sidebar
                config={formateurNav}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="main">
                <Topbar
                    config={formateurNav}
                    onMenuClick={() => setSidebarOpen(o => !o)}
                />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}