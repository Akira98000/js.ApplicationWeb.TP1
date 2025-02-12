const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../front-end")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/index.html"));
});

PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
