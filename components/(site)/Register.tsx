'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../app/styles/auth.module.css'

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

    function update(key: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (form.password !== form.confirm) return alert('Mots de passe différents')
        router.push('/otp')
    }

    return (
        <main className={styles.main}>
            <div className={styles.card}>

                {/* ── LOGO ── */}
                <div className={styles.logoWrap}>
                        <svg width="100%" viewBox="0 0 320 72" xmlns="http://www.w3.org/2000/svg" aria-label="weLearn">
                            <g transform="translate(36, 36)">
                                <circle cx="0" cy="0" r="28" fill="none" stroke="#e8e8f5" strokeWidth="1" />
                                <circle cx="0" cy="0" r="28" fill="none" stroke="#4f46e5" strokeWidth="2"
                                    strokeDasharray="132 176" strokeDashoffset="44"
                                    strokeLinecap="round"
                                    transform="rotate(-90)" />
                                <circle cx="0" cy="0" r="20" fill="#f5f5ff" />
                                <polyline points="-7,1 -2,7 8,-6" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="15" cy="-23" r="2" fill="#4f46e5" />
                            </g>
                            {/* Séparateur */}
                            <rect x="77" y="18" width="0.8" height="36" fill="#4f46e5" opacity="0.2" />
                            {/* we */}
                            <text x="86" y="47" fontFamily="'DM Sans', sans-serif" fontSize="28" fontWeight="700" fill="#1a1a2e" letterSpacing="-0.5">we</text>
                            {/* Learn */}
                            <text x="118" y="47" fontFamily="'DM Sans', sans-serif" fontSize="28" fontWeight="300" fill="#1a1a2e" letterSpacing="-0.5">Learn</text>
                        </svg>

                </div>

                <div className={styles.cardHeader}>
                    <span className={styles.badge}>✨ Nouveau compte</span>
                    <h1>Créer un compte</h1>
                    <p className={styles.sub}>
                        Déjà inscrit ?{' '}
                        <Link href="/login">Se connecter</Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nom complet</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Jean Dupont"
                            value={form.name}
                            onChange={update('name')}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Adresse e-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="vous@exemple.com"
                            value={form.email}
                            onChange={update('email')}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={update('password')}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="confirm">Confirmer le mot de passe</label>
                        <input
                            id="confirm"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirm}
                            onChange={update('confirm')}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btnSubmit}>
                        Créer mon compte
                    </button>
                </form>

                <div className={styles.divider}>ou continuer avec</div>
                <GoogleButton styles={styles} />

            </div>
        </main>
    )
}

function GoogleButton({ styles }: { styles: any }) {
    return (
        <button type="button" className={styles.btnGoogle} onClick={() => { }}>
            <GoogleIcon />
            Continuer avec Google
        </button>
    )
}

function GoogleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}