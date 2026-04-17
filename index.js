const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Coloque suas chaves aqui (pode ser uma ou várias)
const KEYS = ["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", "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"];

app.post('/proxy', async (req, res) => {
    try {
        const randomKey = KEYS[Math.floor(Math.random() * KEYS.length)];
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', req.body, {
            headers: {
                'Authorization': `Bearer ${randomKey}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro na conexão com a IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
