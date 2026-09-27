import express from "express";
import productoRoutes from "./routes/productoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/productos", productoRoutes);
app.use(errorHandler);

export default app;
