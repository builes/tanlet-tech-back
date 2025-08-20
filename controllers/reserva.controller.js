import pool from "../db.js";

export const obtenerReservasPorDia = async (req, res) => {
  try {
    const { id } = req.params; // id prestador
    const { fecha } = req.query;

    const [rows] = await pool.query(
      `SELECT hora_inicio, hora_fin
       FROM reservas
       WHERE id_prestador = ? AND fecha_reserva = ?`,
      [id, fecha]
    );

    res.json({ ok: true, data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ ok: false, error: "Error al obtener reservas" });
  }
};

export const crearReserva = async (req, res) => {
  try {
    const {
      id_prestador,
      id_usuario_cliente,
      id_servicio,
      fecha_reserva,
      hora_inicio,
      hora_fin,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO reservas 
       (id_prestador, id_usuario_cliente, id_servicio, fecha_reserva, hora_inicio, hora_fin)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id_prestador,
        id_usuario_cliente,
        id_servicio,
        fecha_reserva,
        hora_inicio,
        hora_fin,
      ]
    );

    res.json({
      ok: true,
      message: "Reserva creada con éxito",
      id_reserva: result.insertId, // 👈 devolvemos el id real
    });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ ok: false, error: "Error al crear la reserva" });
  }
};

export const cancelarReserva = async (req, res) => {
  try {
    const { id_reserva } = req.params;
    const { id_usuario_cliente } = req.body; // viene del token/session

    console.log(id_reserva, id_usuario_cliente);

    // Verificar que la reserva le pertenece al usuario
    const [rows] = await pool.query(
      `SELECT * FROM reservas WHERE id_reserva = ? AND id_usuario_cliente = ?`,
      [id_reserva, id_usuario_cliente]
    );

    if (rows.length === 0) {
      return res
        .status(403)
        .json({ ok: false, error: "No puedes cancelar esta reserva" });
    }

    // Actualizar estado
    await pool.query(
      `UPDATE reservas SET estado = 'cancelada' WHERE id_reserva = ?`,
      [id_reserva]
    );

    res.json({ ok: true, message: "Reserva cancelada con éxito" });
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    res.status(500).json({ ok: false, error: "Error al cancelar la reserva" });
  }
};
