import express from 'express';
import cors from "cors"
import userRouter from './routes/user.routes.js'
import dogRouter from './routes/dog.routes.js'
import messageRouter from './routes/message.routes.js'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
const allowedOrigins = ["http://localhost:5173", "https://foarm1.netlify.app", "https://example.com"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}
))
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
app.use("/api/v1/chat",messageRouter)
app.get('/test', (req, res) => {
    console.log("Received test request");
    res.json({ message: "Test successful" });
});
export { app }
