export default function FormateurDashboard() {
    return (
        <>
            {/* Welcome banner */}
            <div className="content">

                <div className="page active" id="page-dashboard">
            <div className="welcome-banner">
                <div className="welcome-text">
                    <h2>Bonjour, Marie 👋</h2>
                    <p>Vous avez 3 nouveaux étudiants inscrits cette semaine.</p>
                </div>
                <div className="welcome-actions">
                    <button className="wbtn">Voir les stats</button>
                    <button className="wbtn solid">+ Nouveau cours</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                {[
                    { icon: '📚', color: 'purple', value: '4', label: 'Cours actifs', change: '+1 ce mois', up: true },
                    { icon: '👥', color: 'green', value: '127', label: 'Étudiants', change: '+12%', up: true },
                    { icon: '⭐', color: 'yellow', value: '4.8', label: 'Note moyenne', change: '+0.2', up: true },
                    { icon: '💰', color: 'red', value: '2 840€', label: 'Revenus du mois', change: '+8%', up: true },
                ].map(s => (
                    <div className="stat-card" key={s.label}>
                        <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                        <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.change}</div>
                    </div>
                ))}
            </div>

            </div>
            </div>
        </>
    )
}