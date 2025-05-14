const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load resume content
const resumePath = path.join(__dirname, 'data', 'anthonyfox_res.md');
const resume = fs.readFileSync(resumePath, 'utf8');

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `You are a helpful assistant that answers questions about this resume:\n\n${resume}` },
        ...messages,
      ],
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

