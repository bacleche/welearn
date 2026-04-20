'use client'

import { useState, useRef, useEffect } from 'react'

// ── TYPES ──────────────────────────────────────────────────────
type Message = {
    id: number
    from: 'student' | 'me'
    text: string
    time: string
}

type Thread = {
    id: number
    initials: string
    avatarCls: string
    name: string
    course: string
    courseProgress: number
    preview: string
    time: string
    unread: number
    messages: Message[]
}

// ── DONNÉES ────────────────────────────────────────────────────
const THREADS: Thread[] = [
    {
        id: 1,
        initials: 'KM', avatarCls: 's-a1',
        name: 'Koffi Mensah',
        course: 'UI/UX Design Avancé', courseProgress: 78,
        preview: "Bonjour, j'ai une question sur le module 18…",
        time: '5 min', unread: 1,
        messages: [
            { id: 1, from: 'student', text: "Bonjour Marie, j'ai une question concernant le module 18 sur les Design Systems.", time: "Aujourd'hui · 10:24" },
            { id: 2, from: 'student', text: "Je n'arrive pas à comprendre la différence entre les tokens de design et les variables Figma. Est-ce que vous pouvez m'expliquer ?", time: '10:25' },
            { id: 3, from: 'me', text: "Bonjour Koffi ! Bonne question 😊 Les tokens de design sont des valeurs abstraites (ex: color.primary) qui représentent des décisions de design, tandis que les variables Figma sont leur implémentation technique dans l'outil.", time: '10:32' },
            { id: 4, from: 'me', text: "Je vais couvrir ça en détail lors de la prochaine session live le 15 avril. Je te conseille de regarder la vidéo bonus du module 17 en attendant 👍", time: '10:33' },
            { id: 5, from: 'student', text: "Merci beaucoup ! Je vais regarder ça. À quel moment dans la vidéo du module 17 est-ce abordé ?", time: 'Il y a 5 min' },
        ],
    },
    {
        id: 2,
        initials: 'SL', avatarCls: 's-a3',
        name: 'Sara Lima',
        course: 'UI/UX Design Avancé', courseProgress: 61,
        preview: 'Est-ce que le prochain live est confirmé ?',
        time: '2h', unread: 2,
        messages: [
            { id: 1, from: 'student', text: "Bonjour ! Est-ce que le prochain live est bien confirmé pour le 15 avril ?", time: "Aujourd'hui · 09:10" },
            { id: 2, from: 'student', text: "Je voudrais m'organiser en avance. Merci 🙏", time: '09:11' },
        ],
    },
    {
        id: 3,
        initials: 'YD', avatarCls: 's-a4',
        name: 'Yann Diallo',
        course: 'Figma Masterclass', courseProgress: 45,
        preview: "J'ai soumis mon devoir, pouvez-vous vérifier ?",
        time: '3h', unread: 1,
        messages: [
            { id: 1, from: 'student', text: "Bonjour Marie, j'ai soumis mon devoir du module 12. Pouvez-vous le vérifier quand vous avez le temps ?", time: "Aujourd'hui · 08:45" },
            { id: 2, from: 'me', text: "Bonjour Yann ! Je regarde ça dans la journée et je te reviens avec mes retours 👌", time: '08:50' },
            { id: 3, from: 'student', text: "Super merci beaucoup !", time: '08:51' },
        ],
    },
    {
        id: 4,
        initials: 'AB', avatarCls: 's-a2',
        name: 'Amara Bah',
        course: 'HTML & CSS Pro', courseProgress: 92,
        preview: 'Merci pour les corrections ! Super cours 🙏',
        time: '1j', unread: 0,
        messages: [
            { id: 1, from: 'me', text: "Bonjour Amara, voici mes retours sur votre projet final. Très bon travail sur le responsive !", time: 'Hier · 14:20' },
            { id: 2, from: 'student', text: "Merci infiniment Marie ! Ce cours a vraiment changé ma façon de coder. Super cours 🙏", time: 'Hier · 15:05' },
            { id: 3, from: 'me', text: "C'est un plaisir ! Vous avez beaucoup progressé. Continuez comme ça 💪", time: 'Hier · 15:10' },
        ],
    },
    {
        id: 5,
        initials: 'EN', avatarCls: 's-a5',
        name: 'Eva Nkosi',
        course: 'HTML & CSS Pro', courseProgress: 85,
        preview: 'Quand sort le module 19 ?',
        time: '2j', unread: 0,
        messages: [
            { id: 1, from: 'student', text: "Bonjour, savez-vous quand le module 19 sera disponible ? J'ai hâte de continuer !", time: 'Il y a 2j · 11:30' },
            { id: 2, from: 'me', text: "Bonjour Eva ! Le module 19 sera disponible la semaine prochaine. Je vous enverrai une notification dès que c'est en ligne 🚀", time: 'Il y a 2j · 12:00' },
        ],
    },
    {
        id: 6,
        initials: 'OT', avatarCls: 's-a4',
        name: 'Omar Touré',
        course: 'UI/UX Design Avancé', courseProgress: 72,
        preview: 'Question sur le projet final…',
        time: '3j', unread: 0,
        messages: [
            { id: 1, from: 'student', text: "Bonjour, j'aurais une question sur les critères d'évaluation du projet final. Combien de slides minimum ?", time: 'Il y a 3j · 10:00' },
            { id: 2, from: 'me', text: "Bonjour Omar ! Minimum 15 slides, avec les sections : recherche utilisateur, wireframes, maquettes et prototype.", time: 'Il y a 3j · 10:30' },
        ],
    },
]

// ── COMPOSANT ──────────────────────────────────────────────────
export default function MessagesPages() {
    const [activeId, setActiveId] = useState<number>(1)
    const [search, setSearch] = useState('')
    const [input, setInput] = useState('')
    const [threads, setThreads] = useState<Thread[]>(THREADS)
    const [showConv, setShowConv] = useState(false) // mobile : afficher la conv
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const activeThread = threads.find(t => t.id === activeId)!
    const totalUnread = threads.reduce((s, t) => s + t.unread, 0)

    const filteredThreads = threads.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.course.toLowerCase().includes(search.toLowerCase())
    )

    // Scroll auto au dernier message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [activeId, threads])

    // Sélectionner un thread
    function selectThread(id: number) {
        setActiveId(id)
        setShowConv(true)
        // Marquer comme lu
        setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: 0 } : t))
    }

    // Envoyer un message
    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim()) return

        const newMsg: Message = {
            id: Date.now(),
            from: 'me',
            text: input.trim(),
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        }

        setThreads(prev => prev.map(t =>
            t.id === activeId
                ? { ...t, messages: [...t.messages, newMsg], preview: input.trim(), time: 'À l\'instant' }
                : t
        ))
        setInput('')
    }

    return (
        <>
            {/* ── EN-TÊTE ── */}
            <div className="page-header" style={{ marginBottom: '1.25rem' }}>
                <div>
                    <div className="page-title">💬 <span>Messages</span></div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                        {totalUnread > 0
                            ? `${totalUnread} message${totalUnread > 1 ? 's' : ''} non lu${totalUnread > 1 ? 's' : ''}`
                            : 'Tous les messages sont lus ✓'
                        }
                    </div>
                </div>
            </div>

            {/* ── LAYOUT MESSAGES ── */}
            <div className="messages-layout">

                {/* ── LISTE DES THREADS ── */}
                <div
                    className="msg-list"
                    style={{ display: showConv ? 'none' : 'flex' }}
                    id="msg-list-panel"
                >
                    <div className="msg-list-header">
                        <div className="msg-list-title">Conversations</div>
                        {totalUnread > 0 && (
                            <span style={{
                                background: 'var(--danger)', color: '#fff',
                                fontSize: '.65rem', fontWeight: 700,
                                padding: '.2rem .5rem', borderRadius: 999,
                            }}>
                                {totalUnread}
                            </span>
                        )}
                    </div>

                    {/* Recherche */}
                    <div className="msg-search">
                        <span>🔍</span>
                        <input
                            placeholder="Rechercher…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1rem' }}
                            >×</button>
                        )}
                    </div>

                    {/* Threads */}
                    <div style={{ overflowY: 'auto', flex: 1 }}>
                        {filteredThreads.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)', fontSize: '.82rem' }}>
                                Aucune conversation trouvée
                            </div>
                        ) : (
                            filteredThreads.map(thread => (
                                <div
                                    key={thread.id}
                                    className={`msg-thread ${activeId === thread.id ? 'active' : ''}`}
                                    onClick={() => selectThread(thread.id)}
                                >
                                    <div className={`mt-avatar ${thread.avatarCls}`}>{thread.initials}</div>
                                    <div className="mt-info">
                                        <div className="mt-name">{thread.name}</div>
                                        <div className="mt-preview">{thread.preview}</div>
                                    </div>
                                    <div className="mt-right">
                                        <div className="mt-time">{thread.time}</div>
                                        {thread.unread > 0 && (
                                            <div className="mt-unread">{thread.unread}</div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ── CONVERSATION ── */}
                <div
                    className="msg-conversation"
                    style={{ display: !showConv ? 'none' : 'flex' }}
                    id="msg-conv-panel"
                >
                    {/* Header conversation */}
                    <div className="conv-header">
                        {/* Retour mobile */}
                        <button
                            onClick={() => setShowConv(false)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '1.2rem', color: 'var(--muted)', padding: '.25rem',
                                display: 'flex', alignItems: 'center',
                            }}
                            aria-label="Retour"
                        >
                            ←
                        </button>

                        <div className={`mt-avatar ${activeThread.avatarCls}`}>{activeThread.initials}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="conv-name">{activeThread.name}</div>
                            <div className="conv-course">
                                {activeThread.course} · {activeThread.courseProgress}% complété
                            </div>
                        </div>

                        {/* Actions header */}
                        <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                            <button className="icon-btn" title="Profil étudiant">👤</button>
                            <button className="icon-btn" title="Plus d'options">⋯</button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="conv-messages">
                        {activeThread.messages.map((msg, i) => {
                            const isMe = msg.from === 'me'
                            return (
                                <div key={msg.id} className={`msg-bubble ${isMe ? 'mine' : ''}`}>
                                    {/* Avatar */}
                                    <div
                                        className="bubble-av"
                                        style={isMe
                                            ? { background: 'linear-gradient(135deg,var(--accent),var(--primary))' }
                                            : undefined
                                        }
                                    >
                                        {isMe ? 'MD' : activeThread.initials}
                                    </div>

                                    <div className="bubble-content">
                                        <div className="bubble-text">{msg.text}</div>
                                        <div className="bubble-time">{msg.time}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form className="conv-input" onSubmit={sendMessage}>
                        <input
                            placeholder="Écrire un message…"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="send-btn"
                            disabled={!input.trim()}
                            style={{ opacity: input.trim() ? 1 : .5 }}
                        >
                            Envoyer ✈️
                        </button>
                    </form>
                </div>

                {/* ── VUE DESKTOP : les deux panneaux toujours visibles ── */}
                <style>{`
          @media (min-width: 769px) {
            #msg-list-panel { display: flex !important; }
            #msg-conv-panel { display: flex !important; }
          }
        `}</style>
            </div>

            {/* ── STYLES MOBILE ── */}
            <style>{`
        @media (max-width: 768px) {
          .messages-layout {
            grid-template-columns: 1fr !important;
            min-height: 75vh;
          }

          /* Sur mobile : liste et conv sont chacune pleine largeur */
          #msg-list-panel {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }

          #msg-conv-panel {
            min-height: 70vh;
          }

          .page-header { flex-direction: column; align-items: flex-start; }

          /* Cache le bouton retour sur desktop */
          .conv-header button[aria-label="Retour"] {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .conv-header button[aria-label="Retour"] {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .conv-input { padding: .75rem 1rem; gap: .5rem; }
          .send-btn   { padding: .55rem .85rem; font-size: .78rem; }
          .conv-messages { padding: 1rem; }
          .bubble-content { max-width: 85%; }
        }
      `}</style>
        </>
    )
}