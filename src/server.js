import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// ✅ CORS ACTUALIZADO
const FRONTEND_URLS = [
  "http://localhost:5173",
  "https://todo-pwa-front-ftp.vercel.app",
  "https://ya-me-canse.vercel.app"  // 🚀 nuevo dominio
];

app.use(cors({
  origin: FRONTEND_URLS,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "todo-pwa-api" }));
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const { PORT = 4000, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Conectado exitosamente al puerto: ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
    process.exit(1);
  });

export default app;
