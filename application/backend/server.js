/**
 * Server Entry Point
 *
 * Initializes the Express application, configures middleware,
 * loads environment variables, enables CORS during development,
 * and mounts all API routes.
 */

import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes.js";

const app = express();
app.use(express.json());


const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://3.133.58.251"
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // allow curl/Postman
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
}));

// Serve static uploads
app.use("/images", express.static("uploads/portraits"));
//app.use("/cv", express.static("uploads/cv"));

app.use("/api", routes);


const port = Number(process.env.PORT || 3010);
app.listen(port, '0.0.0.0', () => console.log(`API listening on ${port}`));
