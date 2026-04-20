export type NavItem = {
    id: string
    label: string
    icon: string
    href: string
    badge?: number
}

export type SidebarConfig = {
    role: string
    roleLabel: string
    userName: string
    initials: string
    sections: {
        title: string
        items: NavItem[]
    }[]
}

export const formateurNav: SidebarConfig = {
    role: 'formateur',
    roleLabel: 'Formateur',
    userName: 'Marie Dubois',
    initials: 'MD',
    sections: [
        {
            title: 'Principal',
            items: [
                { id: 'dashboard', label: 'Tableau de bord', icon: '🏠', href: '/formateur' },
                { id: 'cours', label: 'Mes Cours', icon: '📚', href: '/formateur/mes_cours' },
                { id: 'etudiants', label: 'Mes Étudiants', icon: '👥', href: '/formateur/mes_etudiants' },
                { id: 'revenus', label: 'Mes Revenus', icon: '💰', href: '/formateur/revenus' },
            ],
        },
        {
            title: 'Communication',
            items: [
                { id: 'lives', label: 'Sessions Live', icon: '🔴', href: '/formateur/mon_live' },
                { id: 'messages', label: 'Messages', icon: '💬', href: '/formateur/messages', badge: 3 },
            ],
        },
        {
            title: 'Compte',
            items: [
                { id: 'profil', label: 'Mon Profil', icon: '👤', href: '/formateur/profilFormateur' },
            ],
        },
    ],
}

export const adminNav: SidebarConfig = {
    role: 'admin',
    roleLabel: 'Administrateur',
    userName: 'Admin ICONNECT',
    initials: 'AD',
    sections: [
        {
            title: 'Gestion',
            items: [
                { id: 'dashboard', label: 'Tableau de bord', icon: '🏠', href: '/admin' },
                { id: 'users', label: 'Utilisateurs', icon: '👥', href: '/admin/users' },
                { id: 'formations', label: 'Formations', icon: '📚', href: '/admin/formations' },
                { id: 'revenus', label: 'Revenus', icon: '💰', href: '/admin/revenus' },
            ],
        },
    ],
}

export const studentNav: SidebarConfig = {
    role: 'student',
    roleLabel: 'Étudiant',
    userName: 'Jean Étudiant',
    initials: 'JE',
    sections: [
        {
            title: 'Mon espace',
            items: [
                { id: 'dashboard', label: 'Tableau de bord', icon: '🏠', href: '/student' },
                { id: 'mes-cours', label: 'Mes Cours', icon: '📚', href: '/student/cours' },
                { id: 'progression', label: 'Progression', icon: '📈', href: '/student/progression' },
                { id: 'certificats', label: 'Certificats', icon: '🏆', href: '/student/certificats' },
                { id: 'messages', label: 'Messages', icon: '💬', href: '/student/messages', badge: 1 },
            ],
        },
    ],
}