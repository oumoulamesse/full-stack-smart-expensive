import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", amount: 400 },
  { name: "Feb", amount: 300 },
  { name: "Mar", amount: 500 },
  { name: "Apr", amount: 200 },
];

export default function Analytics() {
  return (
    <div style={{ padding: "40px", color: "#f5f0e8" }}>
      <h2 style={{
        fontFamily: "Cormorant Garamond",
        fontSize: "32px",
        marginBottom: "30px"
      }}>
        Analytics
      </h2>

      <div style={{
        background: "#0f0f0f",
        padding: "20px",
        border: "1px solid rgba(212,175,55,0.1)"
      }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#d4af37"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}