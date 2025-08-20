-- ============================================
-- CREACIÓN DE BASE DE DATOS
-- ============================================
CREATE DATABASE IF NOT EXISTS gestion_reservas;
USE gestion_reservas;

-- ============================================
-- TABLA: Usuarios
-- ============================================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    rol ENUM('cliente','prestador','admin') NOT NULL DEFAULT 'cliente',
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: Servicios
-- ============================================
CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_empresa varchar(150) NOT NULL,
    nombre_servicio VARCHAR(150) NOT NULL,
    descripcion TEXT,
    duracion_minutos INT NOT NULL DEFAULT 30,
    precio INT NOT NULL,
    imagen_url VARCHAR(255),
    distancia_metros INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- ============================================
-- TABLA: Reservas
-- ============================================
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_cliente INT NOT NULL,
    id_servicio INT NOT NULL,
    id_prestador INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('confirmada','cancelada','completada') DEFAULT 'confirmada',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_cliente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE,
    FOREIGN KEY (id_prestador) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- ============================================
-- TABLA: Notificaciones (opcional)
-- ============================================
CREATE TABLE notificaciones (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT NOT NULL, -- referencia directa a la reserva
    mensaje TEXT NOT NULL,
    tipo ENUM('reserva_confirmada','reserva_cancelada') NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
    FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE
);

