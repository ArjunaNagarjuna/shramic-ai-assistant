import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Shramic AI Assistant. Ask me anything about Shramic Networks.",
    },
  ]);

  const sendMessage = async (text = null) => {
    const userQuestion = text || question;

    if (!userQuestion.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      const response = await fetch(
        "https://shramic-ai-assistant.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: userQuestion,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to connect to server.",
        },
      ]);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        <div className="header">
          <div className="header-content">
            <div className="logo">🤖</div>

            <div>
              <h1>Shramic AI Assistant</h1>

              <p>
                AI-Powered Infrastructure for India's Rural Workforce
              </p>
            </div>
          </div>
        </div>

        <div className="quick-buttons">

          <button
            onClick={() =>
              sendMessage("Who founded Shramic Networks?")
            }
          >
            Founder
          </button>

          <button
            onClick={() =>
              sendMessage("What is Shramic Krushi?")
            }
          >
            Krushi
          </button>

          <button
            onClick={() =>
              sendMessage("What internships are available?")
            }
          >
            Internship
          </button>

          <button
            onClick={() =>
              sendMessage("Where is Shramic Networks located?")
            }
          >
            Location
          </button>

        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user"
                  ? "user-message"
                  : "bot-message"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button onClick={() => sendMessage()}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;