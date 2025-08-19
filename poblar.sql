-- ============================================
-- POBLAR TABLA USUARIOS
-- ============================================
INSERT INTO usuarios (nombre, email, telefono, rol, password_hash) VALUES
('Carlos Gómez', 'carlos@empresa.com', '3001234567', 'prestador', 'hash1'),
('María López', 'maria@empresa.com', '3102345678', 'prestador', 'hash2'),
('Juan Pérez', 'juan@empresa.com', '3203456789', 'prestador', 'hash3'),
('Ana Torres', 'ana@empresa.com', '3014567890', 'prestador', 'hash4');

-- ============================================
-- POBLAR TABLA SERVICIOS (2 servicios por prestador)
-- ============================================
INSERT INTO servicios (id_usuario, nombre_empresa, nombre_servicio, descripcion, duracion_minutos, precio, imagen_url, distancia_metros) VALUES
(1, 'Spa Relax', 'Masaje relajante', 'Sesión de masaje para reducir estrés', 60, 80000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755617608/Gemini_Generated_Image_is8ucwis8ucwis8u_rk0fye.jpg', 1500),
(1, 'Spa Relax', 'Masaje descontracturante', 'Masaje para aliviar tensiones musculares', 45, 90000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755617608/Gemini_Generated_Image_is8ucwis8ucwis8u_rk0fye.jpg', 1500),

(2, 'Belleza Total', 'Corte de cabello', 'Corte moderno y personalizado', 30, 30000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755617608/Gemini_Generated_Image_cgp0u6cgp0u6cgp0_oyk7ky.jpg', 2000),
(2, 'Belleza Total', 'Manicure', 'Manicure profesional con esmalte tradicional', 40, 25000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755616811/logo_prerdn.png', 2000),

(3, 'FitPro', 'Entrenamiento funcional', 'Rutina guiada en gimnasio', 60, 50000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755617616/Gemini_Generated_Image_7v2wf97v2wf97v2w_ajqedi.jpg', 2500),
(3, 'FitPro', 'Entrenamiento personalizado', 'Entrenamiento 1 a 1 con coach', 90, 100000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755617616/Gemini_Generated_Image_7v2wf97v2wf97v2w_ajqedi.jpg', 2500),

(4, 'Clínica Dental Torres', 'Limpieza dental', 'Limpieza y profilaxis completa', 45, 60000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755618092/Gemini_Generated_Image_4z9d0v4z9d0v4z9d_kpfesa.jpg', 1800),
(4, 'Clínica Dental Torres', 'Blanqueamiento dental', 'Tratamiento estético dental', 60, 200000, 'https://res.cloudinary.com/dlh7a4ube/image/upload/v1755618092/Gemini_Generated_Image_4z9d0v4z9d0v4z9d_kpfesa.jpg', 1800);

