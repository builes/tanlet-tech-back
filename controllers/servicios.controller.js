import pool from "../db.js";

export const mostrarServicios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servicios");
    res.json({
      ok: true,
      data: rows, // ✅ los servicios van en "data"
    });
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener los servicios",
    });
  }
};

export const mostrarServicioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM servicios WHERE id_servicio = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Servicio no encontrado",
      });
    }
    res.json({
      ok: true,
      data: rows[0], // ✅ el servicio va en "data"
    });
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener el servicio",
    });
  }
};
