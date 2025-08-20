import express from "express";
import pool from "./db.js";
import cors from "cors";
import fs from "fs";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import operacionRoutes from "./routes/servicio.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/servicios", operacionRoutes);
app.use("/api/reservas", reservaRoutes);

// Ruta de prueba de conexión
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha");
    res.json({ ok: true, fecha: rows[0].fecha });
  } catch (err) {
    console.error("Error de conexión:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Función para poblar la BD
const seedDatabase = async () => {
  try {
    const filePath = path.resolve("./poblar.sql");
    const seedSQL = fs.readFileSync(filePath, "utf8");

    // Ejecuta varias consultas separadas por ;
    const queries = seedSQL
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length);
    for (const query of queries) {
      await pool.query(query);
    }

    console.log("✅ Base de datos poblada con datos iniciales");
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
  }
};

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
  // Poblar la BD solo si está vacía
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM usuarios");
  if (rows[0].count === 0) {
    await seedDatabase();
  } else {
    console.log("ℹ️ La BD ya tiene datoss");
  }
});
