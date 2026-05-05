import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  .register-root {
    min-height: 100vh;
    background: #080808;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    position: relative;
    overflow: hidden;
  }

  .register-root::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 60%);
  }

  .grid-bg {
    position: fixed; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .register-card {
    position: relative;
    width: 420px;
    background: #0f0f0f;
    border: 1px solid rgba(212,175,55,0.15);
    padding: 56px 48px 48px;
    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }

  .register-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .register-eyebrow {
    font-size: 10px; letter-spacing: 0.25em;
    color: rgba(212,175,55,0.7); text-transform: uppercase; margin: 0 0 20px;
  }

  .register-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300; color: #f5f0e8;
    line-height: 1.05; margin: 0 0 8px; letter-spacing: -0.02em;
  }

  .register-subtitle {
    font-size: 11px; color: rgba(255,255,255,0.25);
    margin: 0 0 44px; letter-spacing: 0.05em;
  }

  .field-group { margin-bottom: 16px; }

  .field-label {
    display: block; font-size: 9px; letter-spacing: 0.2em;
    color: rgba(212,175,55,0.5); text-transform: uppercase; margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: #f0ece4; font-family: 'DM Mono', monospace;
    font-size: 13px; padding: 14px 16px; outline: none;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .field-input::placeholder { color: rgba(255,255,255,0.15); }

  .field-input:focus {
    border-color: rgba(212,175,55,0.4);
    background: rgba(212,175,55,0.03);
  }

  .submit-btn {
    width: 100%; padding: 16px; margin-top: 28px;
    background: rgba(212,175,55,0.9); color: #080808;
    border: none; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s, transform 0.1s;
  }

  .submit-btn:hover { background: rgba(212,175,55,1); }
  .submit-btn:active { transform: scale(0.99); }

  .register-footer {
    margin-top: 28px; padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
    text-align: center; font-size: 11px;
    color: rgba(255,255,255,0.2); letter-spacing: 0.05em;
  }

  .register-footer a {
    color: rgba(212,175,55,0.7); text-decoration: none; transition: color 0.2s;
  }

  .register-footer a:hover { color: rgba(212,175,55,1); }

  .corner-tag {
    position: fixed; bottom: 32px; right: 32px;
    font-size: 9px; letter-spacing: 0.15em;
    color: rgba(255,255,255,0.1); text-transform: uppercase;
  }

  .corner-tag span { color: rgba(212,175,55,0.3); }
`;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ LOGIQUE ORIGINALE — RIEN N'A CHANGÉ
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="register-root">
        <div className="grid-bg" />

        <div className="register-card">
          <p className="register-eyebrow">Smart Expensive</p>
          <h1 className="register-title">Créer un compte.</h1>
          <p className="register-subtitle">Rejoignez votre espace de gestion financière</p>

          <form onSubmit={handleSubmit}>

            <div className="field-group">
              <label className="field-label">Nom complet</label>
              <input
                className="field-input"
                type="text"
                placeholder="Jean Dupont"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Adresse email</label>
              <input
                className="field-input"
                type="email"
                placeholder="vous@exemple.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Mot de passe</label>
              <input
                className="field-input"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn">
              Créer mon accès
            </button>

          </form>

          <div className="register-footer">
            Déjà un compte ?{" "}
            <Link to="/login">Se connecter</Link>
          </div>
        </div>

        <p className="corner-tag"><span>©</span> 2025 Smart Expensive</p>
      </div>
    </>
  );
}