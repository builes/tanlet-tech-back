import bcrypt from "bcrypt";
import pool from "../db.js";

export const registerUser = async (req, res) => {
  try {
    const { nombre, email, telefono, password, rol } = req.body;

    console.log(req.body);

    // Validaciones básicas
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Verificar si el correo ya existe
    const [existing] = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el usuario
    const [result] = await pool.query(
      `INSERT INTO usuarios (nombre, email, telefono, password_hash, rol) 
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, email, telefono || null, hashedPassword, rol]
    );

    const usuario = {
      id: result.insertId,
      nombre,
      email,
      telefono,
      rol,
    };

    res.json({ message: "Usuario registrado correctamente", usuario });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, email, password_hash FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    const user = rows[0];

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Retornar datos del usuario (sin la clave)
    res.json({
      message: "Login exitoso",
      usuario: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
