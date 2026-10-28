
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_demo";

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err.message));

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from MERN Backend!",
        name: "Anmol Khare"
    });
});

// Serve the HTML, CSS and JavaScript assignment
const projectPath = path.join(__dirname, "../project");

app.use("/project", express.static(projectPath));

// Serve the existing React frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();

    res.sendFile(
        path.join(frontendPath, "index.html"),
        (err) => {
            if (err) next(err);
        }
    );
});

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
});
