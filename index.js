const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

app.get("/", async (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
