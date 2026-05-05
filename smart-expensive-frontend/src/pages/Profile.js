import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .profile-root {
    display: flex;
    min-height: 100vh;
    background: #080808;
    font-family: 'DM Mono', monospace;
    color: #f0ece4;
  }

  .profile-root::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 50% at 75% 15%, rgba(212,175,55,0.05) 0%, transparent 65%),
      radial-gradient(ellipse 35% 45% at 15% 85%, rgba(255,255,255,0.02) 0%, transparent 60%);
  }

  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .profile-main {
    flex: 1; padding: 48px 52px;
    position: relative; z-index: 1;
    max-width: 960px;
    animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* HEADER */
  .profile-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 48px; padding-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .profile-eyebrow {
    font-size: 9px; letter-spacing: 0.25em;
    color: rgba(212,175,55,0.5); text-transform: uppercase; margin: 0 0 8px;
  }
  .profile-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px; font-weight: 300; color: #f5f0e8;
    margin: 0; letter-spacing: -0.02em; line-height: 1;
  }
  .logout-btn {
    background: transparent; border: 1px solid rgba(220,60,60,0.22);
    color: rgba(200,90,90,0.6); font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 10px 20px; cursor: pointer; transition: all 0.2s;
  }
  .logout-btn:hover {
    border-color: rgba(220,60,60,0.5); color: rgba(230,110,110,0.9);
    background: rgba(220,60,60,0.05);
  }

  /* USER CARD */
  .user-card {
    background: #0f0f0f; border: 1px solid rgba(212,175,55,0.12);
    padding: 32px; max-width: 420px; position: relative; margin-bottom: 48px;
  }
  .user-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, rgba(212,175,55,0.5), transparent);
  }
  .user-card-header {
    display: flex; align-items: center; gap: 18px;
    margin-bottom: 24px; padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .user-avatar {
    width: 48px; height: 48px;
    background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.22);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; color: rgba(212,175,55,0.85); flex-shrink: 0;
  }
  .user-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 400; color: #f5f0e8; margin: 0 0 3px;
  }
  .user-card-role {
    font-size: 9px; letter-spacing: 0.18em;
    color: rgba(212,175,55,0.45); text-transform: uppercase; margin: 0;
  }
  .user-field {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .user-field:last-child { border-bottom: none; }
  .user-field-key { font-size: 9px; letter-spacing: 0.16em; color: rgba(255,255,255,0.25); text-transform: uppercase; }
  .user-field-val { font-size: 12px; color: #ddd8cc; }

  /* SECTION LABEL */
  .section-label {
    font-size: 9px; letter-spacing: 0.25em;
    color: rgba(212,175,55,0.45); text-transform: uppercase; margin: 0 0 18px;
  }

  /* FORM */
  .expense-form {
    background: #0f0f0f; border: 1px solid rgba(255,255,255,0.06);
    padding: 28px; margin-bottom: 28px; position: relative;
  }
  .expense-form::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, rgba(212,175,55,0.3), transparent);
  }
  .form-editing-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(212,175,55,0.6); margin-bottom: 18px;
    padding: 5px 10px; border: 1px solid rgba(212,175,55,0.18);
    background: rgba(212,175,55,0.04);
  }
  .form-editing-badge span {
    width: 4px; height: 4px; background: rgba(212,175,55,0.6);
    border-radius: 50%; animation: blink 1.4s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

  .form-row {
    display: grid; grid-template-columns: 1fr 1fr auto;
    gap: 12px; align-items: end;
  }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-label { font-size: 8px; letter-spacing: 0.2em; color: rgba(212,175,55,0.45); text-transform: uppercase; }
  .form-input {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    color: #f0ece4; font-family: 'DM Mono', monospace; font-size: 12px;
    padding: 12px 14px; outline: none; transition: border-color 0.2s, background 0.2s; width: 100%;
  }
  .form-input::placeholder { color: rgba(255,255,255,0.14); }
  .form-input:focus { border-color: rgba(212,175,55,0.35); background: rgba(212,175,55,0.02); }

  .form-submit {
    padding: 12px 24px; background: rgba(212,175,55,0.88); color: #080808;
    border: none; font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; white-space: nowrap; height: 44px;
    transition: background 0.2s, transform 0.1s;
  }
  .form-submit:hover { background: rgba(212,175,55,1); }
  .form-submit:active { transform: scale(0.98); }
  .form-submit.editing {
    background: rgba(212,175,55,0.08); color: rgba(212,175,55,0.9);
    border: 1px solid rgba(212,175,55,0.25);
  }
  .form-submit.editing:hover { background: rgba(212,175,55,0.14); }

  .cancel-btn {
    margin-top: 12px; background: transparent; border: none;
    color: rgba(255,255,255,0.22); font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; padding: 4px 0; transition: color 0.2s;
  }
  .cancel-btn:hover { color: rgba(255,255,255,0.5); }

  /* EXPENSE LIST */
  .expense-list { display: flex; flex-direction: column; gap: 2px; }

  .expense-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; background: #0f0f0f;
    border: 1px solid rgba(255,255,255,0.05);
    transition: border-color 0.2s, background 0.2s;
    animation: fadeUp 0.3s ease both;
  }
  .expense-item:hover { border-color: rgba(212,175,55,0.12); background: rgba(212,175,55,0.02); }

  .expense-left { display: flex; align-items: center; gap: 16px; }
  .expense-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(212,175,55,0.4); flex-shrink: 0; }
  .expense-category { font-size: 11px; letter-spacing: 0.06em; color: rgba(255,255,255,0.5); }

  .expense-right { display: flex; align-items: center; gap: 24px; }
  .expense-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300; color: #f5f0e8; letter-spacing: -0.01em;
  }
  .expense-currency {
    font-size: 9px; letter-spacing: 0.12em;
    color: rgba(212,175,55,0.5); margin-left: 3px; font-family: 'DM Mono', monospace;
  }
  .expense-actions { display: flex; gap: 6px; }

  .btn-edit {
    background: transparent; border: 1px solid rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.28); font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 6px 12px; cursor: pointer; transition: all 0.2s;
  }
  .btn-edit:hover { border-color: rgba(212,175,55,0.3); color: rgba(212,175,55,0.8); background: rgba(212,175,55,0.04); }

  .btn-delete {
    background: transparent; border: 1px solid rgba(220,60,60,0.1);
    color: rgba(200,80,80,0.38); font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 6px 12px; cursor: pointer; transition: all 0.2s;
  }
  .btn-delete:hover { border-color: rgba(220,60,60,0.4); color: rgba(220,100,100,0.8); background: rgba(220,60,60,0.05); }

  /* EMPTY */
  .expense-empty {
    padding: 56px 0; text-align: center;
    border: 1px dashed rgba(255,255,255,0.06);
  }
  .expense-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 300; color: rgba(255,255,255,0.12); margin: 0 0 6px;
  }
  .expense-empty-sub {
    font-size: 9px; letter-spacing: 0.15em;
    color: rgba(255,255,255,0.1); text-transform: uppercase;
  }

  /* TOTAL */
  .expense-total {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 16px 20px; margin-top: 2px;
    border: 1px solid rgba(212,175,55,0.12);
    background: rgba(212,175,55,0.025);
  }
  .expense-total-label {
    font-size: 9px; letter-spacing: 0.2em;
    color: rgba(212,175,55,0.5); text-transform: uppercase;
  }
  .expense-total-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px; font-weight: 300; color: rgba(212,175,55,0.88); letter-spacing: -0.02em;
  }

  /* LOADING */
  .loading-screen {
    min-height: 100vh; background: #080808;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
  }
  .loading-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 16px; }
  .loading-dots span {
    width: 4px; height: 4px; background: rgba(212,175,55,0.55);
    border-radius: 50%; animation: pulse 1.2s ease-in-out infinite;
  }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100%{opacity:0.2;transform:scale(0.7)} 40%{opacity:1;transform:scale(1)} }
  .loading-text {
    font-size: 9px; letter-spacing: 0.25em;
    color: rgba(255,255,255,0.18); text-transform: uppercase; text-align: center;
  }
`;

export default function Profile() {
  const [user, setUser]         = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount]     = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || token === "undefined") { navigate("/login"); return; }

        const [userRes, expRes] = await Promise.all([
          API.get("/user/me",  { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/expenses", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setUser(userRes.data || null);
        setExpenses(expRes.data || []);
      } catch (err) {
        console.log("PROFILE ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/expenses", { headers: { Authorization: `Bearer ${token}` } });
      setExpenses(res.data || []);
    } catch (err) {
      console.log("EXPENSE ERROR:", err.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (selected) {
        await API.put(`/expenses/${selected._id}`, { amount, category }, { headers: { Authorization: `Bearer ${token}` } });
        setSelected(null);
      } else {
        await API.post("/expenses", { amount, category }, { headers: { Authorization: `Bearer ${token}` } });
      }
      setAmount(""); setCategory("");
      fetchExpenses();
    } catch (err) {
      console.log("SUBMIT ERROR:", err.response?.data);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchExpenses();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data);
    }
  };

  const editExpense = (exp) => {
    setSelected(exp);
    setAmount(exp.amount);
    setCategory(exp.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setSelected(null); setAmount(""); setCategory(""); };

  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  const getInitials = (name = "") =>
    name?.split(" ")?.map((n) => n?.[0])?.join("")?.toUpperCase()?.slice(0, 2) || "";

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="loading-screen">
        <div>
          <div className="loading-dots"><span/><span/><span/></div>
          <p className="loading-text">Chargement</p>
        </div>
      </div>
    </>
  );

  if (!user) return (
    <>
      <style>{styles}</style>
      <div className="loading-screen">
        <p className="loading-text">Session expirée</p>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="profile-root">
        <div className="grid-bg" />
        <Sidebar />

        <div className="profile-main">

          {/* HEADER */}
          <div className="profile-header">
            <div>
              <p className="profile-eyebrow">Smart Expensive</p>
              <h1 className="profile-page-title">Dashboard</h1>
            </div>
            <button className="logout-btn" onClick={logout}>Déconnexion</button>
          </div>

          {/* USER CARD */}
          <div className="user-card">
            <div className="user-card-header">
              <div className="user-avatar">{getInitials(user?.name)}</div>
              <div>
                <p className="user-card-name">{user?.name}</p>
                <p className="user-card-role">Membre actif</p>
              </div>
            </div>
            <div className="user-field">
              <span className="user-field-key">Nom</span>
              <span className="user-field-val">{user?.name}</span>
            </div>
            <div className="user-field">
              <span className="user-field-key">Email</span>
              <span className="user-field-val">{user?.email}</span>
            </div>
          </div>

          {/* FORM */}
          <p className="section-label">
            {selected ? "Modifier la dépense" : "Nouvelle dépense"}
          </p>

          <div className="expense-form">
            {selected && (
              <div className="form-editing-badge">
                <span /> Modification en cours
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Montant (FCFA)</label>
                  <input
                    className="form-input"
                    type="number" placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <input
                    className="form-input"
                    type="text" placeholder="ex: Transport"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={`form-submit${selected ? " editing" : ""}`}>
                  {selected ? "Valider" : "Ajouter"}
                </button>
              </div>
            </form>
            {selected && (
              <button className="cancel-btn" onClick={cancelEdit}>
                ← Annuler la modification
              </button>
            )}
          </div>

          {/* LIST */}
          <p className="section-label">
            Historique — {expenses.length} entrée{expenses.length !== 1 ? "s" : ""}
          </p>

          <div className="expense-list">
            {expenses.length === 0 ? (
              <div className="expense-empty">
                <p className="expense-empty-title">Aucune dépense enregistrée</p>
                <p className="expense-empty-sub">Ajoutez votre première entrée ci-dessus</p>
              </div>
            ) : (
              <>
                {expenses.map((exp) => (
                  <div className="expense-item" key={exp._id}>
                    <div className="expense-left">
                      <span className="expense-dot" />
                      <span className="expense-category">{exp.category}</span>
                    </div>
                    <div className="expense-right">
                      <div>
                        <span className="expense-amount">
                          {Number(exp.amount).toLocaleString("fr-FR")}
                        </span>
                        <span className="expense-currency">FCFA</span>
                      </div>
                      <div className="expense-actions">
                        <button className="btn-edit" onClick={() => editExpense(exp)}>Éditer</button>
                        <button className="btn-delete" onClick={() => deleteExpense(exp._id)}>Suppr.</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="expense-total">
                  <span className="expense-total-label">Total</span>
                  <div>
                    <span className="expense-total-value">
                      {total.toLocaleString("fr-FR")}
                    </span>
                    <span className="expense-currency" style={{ fontSize: "10px" }}> FCFA</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}