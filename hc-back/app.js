import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './rutas/autRutas.js';

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/', router);
app.use("/uploads", express.static("uploads"))

export default app;