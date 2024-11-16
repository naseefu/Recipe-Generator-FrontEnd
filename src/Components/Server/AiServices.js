import React, { useState } from "react";
import axios from "axios";

const CohereChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState();
  const sendQuestion = async () => {
    if (!question) {
      alert("Please enter a question!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/cohere", {
        question: question,
      });
      setResponse(res.data.response);
      console.log(res.data.response)
    } catch (error) {
      console.error("Error communicating with the server:", error);
      setResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cohere AI Chat</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: "100%", height: "80px" }}
      ></textarea>
      <br />
      <button onClick={sendQuestion} style={{ margin: "10px 0" }}>
        Send
      </button>
      <div>
        <h3>Response:</h3>
        <div className="grid grid-cols-2 gap-4 text-left">
        {response && response.map((a)=>(
          <div className="">
            <p>{a.recipe_name}</p>
            {a.ingredients.map((b)=>(
              <p>{b}</p>
            ))}
          </div>
        ))}</div>
    </div>
    </div>
  );
};

export default CohereChat;