import express from "express";
import productoRoutes from "./routes/productoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

import { categorias } from './data/categorias.js';

const app = express();
app.get('/api/categorias', (req, res) => res.json({ success: true, data: categorias }));

app.use(express.json());
app.use("/api/productos", productoRoutes);
app.use(errorHandler);

export default app;
