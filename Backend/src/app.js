import express from 'express';
import cors from "cors"
import userRouter from './routes/user.routes.js'
import dogRouter from './routes/dog.routes.js'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
const allowedOrigins = ["http://localhost:5173", "https://foarm1.netlify.app", "https://example.com"];
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routers

app.use("/api/v1/user", userRouter)
app.use("/api/v1/dog", dogRouter)

app.get('/test', (req, res) => {
    console.log("Received test request");
    res.json({ message: "Test successful" });
});
export { app }
