"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    expertise: string;
    iban: string;
    bic: string;
    currentPassword: string;
    newPassword: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilPage() {
    const [form, setForm] = useState<ProfileData>({
        firstName: "Marie",
        lastName: "Dubois",
        email: "marie.dubois@email.com",
        phone: "+33 6 12 34 56 78",
        bio: "Formatrice spécialisée en UI/UX Design et systèmes de design. 8 ans d'expérience en design produit.",
        expertise: "UI/UX Design, Figma, Design Systems",
        iban: "FR76 3000 4000 0300 0000 4821 43",
        bic: "BNPAFRPPXXX",
        currentPassword: "",
        newPassword: "",
    });

    const [saved, setSaved] = useState(false);

    const handleChange =
        (field: keyof ProfileData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleSave = () => {
        // TODO: appel API ici
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const skills = ["Figma", "UI/UX", "Design System", "CSS", "Prototypage", "Adobe XD"];

    return (
        <div className="page active" id="page-profil">

            {/* ── En-tête ──────────────────────────────────────────────────── */}
            <div className="page-header">
                <div className="page-title">
                    Mon <span>Profil</span>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>
                    {saved ? "✅ Sauvegardé !" : "💾 Sauvegarder les modifications"}
                </button>
            </div>

            {/* ── Layout 2 colonnes ────────────────────────────────────────── */}
            <div className="profile-layout">

                {/* ── Colonne gauche : carte profil ──────────────────────────── */}
                <div>
                    <div className="profile-card">

                        {/* Avatar */}
                        <div className="profile-avatar">MD</div>
                        <div className="profile-name">
                            {form.firstName} {form.lastName}
                        </div>
                        <div className="profile-title">Formatrice UI/UX &amp; Design</div>
                        <div className="profile-verified">✅ Formateur vérifié</div>

                        {/* Stats */}
                        <div className="profile-stats">
                            <div className="prof-stat">
                                <div className="ps-val">8</div>
                                <div className="ps-lbl">Cours</div>
                            </div>
                            <div className="prof-stat">
                                <div className="ps-val">312</div>
                                <div className="ps-lbl">Étudiants</div>
                            </div>
                            <div className="prof-stat">
                                <div className="ps-val">4.9★</div>
                                <div className="ps-lbl">Note</div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="profile-bio">
                            Formatrice spécialisée en UI/UX Design et systèmes de design. 8 ans
                            d&apos;expérience en design produit. Passionnée par la transmission
                            et l&apos;éducation numérique.
                        </div>

                        {/* Skills */}
                        <div style={{ marginBottom: ".85rem" }}>
                            <div style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--text)", marginBottom: ".5rem" }}>
                                Expertises
                            </div>
                            <div className="profile-skills">
                                {skills.map((s) => (
                                    <span key={s} className="skill-tag">{s}</span>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                            📷 Changer la photo
                        </button>
                    </div>
                </div>

                {/* ── Colonne droite : formulaires ───────────────────────────── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    {/* Informations personnelles */}
                    <div className="card">
                        <div className="card-header" style={{ marginBottom: "1.25rem" }}>
                            <div className="card-title">👤 Informations personnelles</div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Prénom</label>
                                <input
                                    className="form-input"
                                    value={form.firstName}
                                    onChange={handleChange("firstName")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nom</label>
                                <input
                                    className="form-input"
                                    value={form.lastName}
                                    onChange={handleChange("lastName")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Téléphone</label>
                                <input
                                    className="form-input"
                                    value={form.phone}
                                    onChange={handleChange("phone")}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Bio / À propos</label>
                            <textarea
                                className="form-input"
                                rows={3}
                                style={{ resize: "vertical" }}
                                value={form.bio}
                                onChange={handleChange("bio")}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Expertise principale</label>
                            <input
                                className="form-input"
                                value={form.expertise}
                                onChange={handleChange("expertise")}
                            />
                        </div>
                    </div>

                    {/* Informations bancaires */}
                    <div className="card">
                        <div className="card-header" style={{ marginBottom: "1.25rem" }}>
                            <div className="card-title">💳 Informations bancaires</div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">IBAN</label>
                                <input
                                    className="form-input"
                                    value={form.iban}
                                    onChange={handleChange("iban")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">BIC/SWIFT</label>
                                <input
                                    className="form-input"
                                    value={form.bic}
                                    onChange={handleChange("bic")}
                                />
                            </div>
                        </div>

                        <div style={{
                            padding: ".85rem",
                            background: "#fef3c7",
                            borderRadius: "12px",
                            border: "1px solid #fde68a",
                            fontSize: ".78rem",
                            color: "#92400e",
                        }}>
                            ⚠️ Les modifications bancaires nécessitent une vérification par
                            l&apos;équipe admin (48h).
                        </div>
                    </div>

                    {/* Sécurité */}
                    <div className="card">
                        <div className="card-header" style={{ marginBottom: "1.25rem" }}>
                            <div className="card-title">🔒 Sécurité</div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Mot de passe actuel</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="Mot de passe actuel"
                                    value={form.currentPassword}
                                    onChange={handleChange("currentPassword")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nouveau mot de passe</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="Nouveau mot de passe"
                                    value={form.newPassword}
                                    onChange={handleChange("newPassword")}
                                />
                            </div>
                        </div>

                        <button className="btn btn-outline">🔒 Modifier le mot de passe</button>
                    </div>

                </div>
            </div>
        </div>
    );
}