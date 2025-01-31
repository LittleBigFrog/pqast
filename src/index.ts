import express from "express";
import { Parser } from "@microsoft/powerquery-parser";

const app = express();
app.use(express.json());

app.post("/parse", (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Missing Power Query code" });
    }

    try {
        const ast = Parser(query);
        return res.json({ ast });
    } catch (error) {
        return res.status(500).json({ error: "Failed to parse query", details: error.toString() });
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
