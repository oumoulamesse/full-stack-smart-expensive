import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    alert("Modifications enregistrées");
  };

  return (
    <div style={{ padding: "40px", color: "#f5f0e8" }}>
      <h2 style={{
        fontFamily: "Cormorant Garamond",
        fontSize: "32px",
        marginBottom: "30px"
      }}>
        Settings
      </h2>

      <div style={{
        background: "#0f0f0f",
        padding: "30px",
        border: "1px solid rgba(212,175,55,0.1)",
        maxWidth: "400px"
      }}>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "11px", color: "#aaa" }}>Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "11px", color: "#aaa" }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={handleSave} style={btnStyle}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff"
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#d4af37",
  border: "none",
  color: "#000",
  cursor: "pointer"
};