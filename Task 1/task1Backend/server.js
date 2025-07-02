const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

const PORT = process.env.PORT || 3000;

const papers = [];

app.post('/submit', (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const paper = { id: uuid(), title, author, content, status: "pending" };

    papers.push(paper);
    return res.status(201).json({ message: "Paper submitted for approval.", paper });
});

app.get('/admin/papers', (req, res) => {
    const pendingPapers = papers.filter(p => p.status == "pending");
    res.send(pendingPapers);
});

app.post('/admin/papers/:id', (req, res) => {
    const paper = papers.find(p => p.id === req.params.id);

    if (!paper) {
        res.status(404).json({ message: "Paper not found." });
    }

    paper.status = "published";
    res.json({message: "Paper published!", paper});
});

app.get('/papers', (req, res) => {
    const publishedPapers = papers.filter(p => p.status === "published");
    res.json(publishedPapers);
});

app.listen(PORT, () => {
    console.log(`Server running at port http://localhost:${PORT}`);
})
