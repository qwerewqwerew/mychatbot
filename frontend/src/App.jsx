import { useState } from "react"; // 01
import "./App.css"; // 02

//const API = "http://localhost:8000/chat";
const API = "https://mychatbot-aee1.onrender.com/chat";

export default function App() {
  // 04
  const [msgs, setMsgs] = useState([]); // 05
  const [input, setInput] = useState(""); // 06
  const [loading, setLoading] = useState(false); // 07

  const send = async () => {
    // 08
    if (!input.trim()) return; // 09
    const userMsg = { role: "user", text: input }; // 10
    setMsgs((prev) => [...prev, userMsg]); // 11
    setInput(""); // 12
    setLoading(true); // 13

    const res = await fetch(API, {
      // 14
      method: "POST", // 15
      headers: { "Content-Type": "application/json" }, // 16
      body: JSON.stringify({ text: input }), // 17
    }); // 18
    const data = await res.json(); // 19
    const botMsg = { role: "bot", text: data.reply }; // 20
    setMsgs((prev) => [...prev, botMsg]); // 21
    setLoading(false); // 22
  }; // 23

  const onKey = (e) => {
    // 24
    if (e.key === "Enter") send(); // 25
  }; // 26

  return (
    // 27
    <div className="wrap">
      {" "}
      // 28
      <h1>🤖 AI 챗봇</h1> // 29
      <div className="box">
        {" "}
        // 30
        {msgs.map(
          (
            m,
            i, // 31
          ) => (
            <div key={i} className={m.role}>
              {" "}
              // 32
              <span>{m.role === "user" ? "🧑" : "🤖"}</span> // 33
              <p>{m.text}</p> // 34
            </div> // 35
          ),
        )}{" "}
        // 36
        {loading && <p className="loading">생각 중...</p>} // 37
      </div>{" "}
      // 38
      <div className="input-row">
        {" "}
        // 39
        <input // 40
          value={input} // 41
          onChange={(e) => setInput(e.target.value)} // 42
          onKeyDown={onKey} // 43
          placeholder="메시지를 입력하세요" // 44
        />{" "}
        // 45
        <button onClick={send}>전송</button> // 46
      </div>{" "}
      // 47
    </div> // 48
  ); // 49
} // 50
