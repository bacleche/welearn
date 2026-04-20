'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/auth.module.css'

export default function OtpPage() {
    const router = useRouter()
    const [digits, setDigits] = useState(['', '', '', '', '', ''])
    const inputs = useRef<HTMLInputElement[]>([])

    function handleChange(i: number, val: string) {
        if (!/^\d?$/.test(val)) return
        const next = [...digits]
        next[i] = val
        setDigits(next)
        if (val && i < 5) inputs.current[i + 1]?.focus()
    }

    function handleKeyDown(i: number, e: React.KeyboardEvent) {
        if (e.key === 'Backspace' && !digits[i] && i > 0)
            inputs.current[i - 1]?.focus()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const code = digits.join('')
        if (code.length < 6) return
        // TODO: appel API vérification OTP
        router.push('/dashboard')
    }

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <span className={styles.badge}>📩 Vérification</span>
                <h1>Code OTP</h1>
                <p className="sub">Entrez le code à 6 chiffres envoyé par e-mail.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', margin: '1.5rem 0' }}>
                        {digits.map((d, i) => (
                            <input
                                key={i}
                                ref={el => { if (el) inputs.current[i] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={e => handleChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                style={{
                                    width: '48px', height: '56px',
                                    textAlign: 'center', fontSize: '1.4rem', fontWeight: 600,
                                    border: '1.5px solid #e0e7ff', borderRadius: '12px',
                                    background: '#f8faff', color: '#1e1b4b', outline: 'none',
                                }}
                            />
                        ))}
                    </div>

                    <button type="submit" className={styles.btnSubmit}>Vérifier</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
                    Code expiré ?{' '}
                    <button type="button" style={{ color: '#4f46e5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                        Renvoyer
                    </button>
                </p>
            </div>
        </main>
    )
}