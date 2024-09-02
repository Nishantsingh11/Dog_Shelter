import { app } from "./app.js";
import connectDB from "./connection/index.js"
import dotenv from 'dotenv'
dotenv.config(
    {
        path: "./.env"
    }
)
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 5000');
    });
})