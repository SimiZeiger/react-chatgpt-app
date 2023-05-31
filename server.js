const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); //allows you to use json from the frontend to the backend
app.use(cors());

const API_KEY = "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";

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "how are you?" }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("Your server is running on port " + PORT));
