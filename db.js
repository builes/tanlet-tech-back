import mysql from "mysql2/promise";

//Conexion de manera local

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Cambia si usas otro usuario
  password: "1234", // Pon tu contraseña si tu MySQL la tiene
  database: "gestion_reservas",
});

export default pool;

//Asi nos conectamos a la bd creada en RDS

//Conexion conRDS
// const connection = await mysql.createConnection({
//   host: "database-1.ctrvlvrfwsza.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "12345678",
//   database: "calculadora", // el nombre de tu BD
//   port: 3306,
// });

// console.log("✅ Conectado a RDS MySQL");
// export default connection;

//Asi nos conectamos a nuestra BD desde la cmd
// mysql -h endpoint -u admin -p
