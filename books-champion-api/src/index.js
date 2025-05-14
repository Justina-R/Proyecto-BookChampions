import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { sequelize } from "./db.js";
import "./models/Books.js";

const app = express();

try {
  app.use(express.json()); // permite que Express entienda el cuerpo (body) de las peticiones JSON
  // express.json() debe estar ANTES de las rutas

  app.use(cors({ origin: 'http://localhost:5173' }));

  // ----------------------------------------------------------
  // Este código de la teoría no funcionaba en /register
  //Para evitar problemas de CORS (Cross-Origin Resource Sharing)
  // app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //next: pasa al siguiente middleware, sin terminar la ejecución del ciclo request-response
    //Este código es RIESGOSO
    // next();
  // });
  
  //-----------------------------------------------------------------
  app.use(bookRoutes);
  app.use(authRoutes);
  await sequelize.authenticate();
  await sequelize.sync(); // crea las tablas si no existen

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(`Ocurrió un error en la inicialización.`, error);
}
