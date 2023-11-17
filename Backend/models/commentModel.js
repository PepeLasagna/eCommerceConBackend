//LLAMADO AL MÓDULO DE MARIADB
const mariadb = require("mariadb");

//CREAMOOS LA POOL PARA LA CONEXIÓN CON LA BASE DE DATOS
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "LasCosa",
  database: "ecommerce",
  connectionLimit: "5",
});

//MODELO DEL MÉTODO POST, PARA COMENTARIOS
const createComment = async (comments) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO comments (score , description, user, product_id ) VALUE (?, ?, ?, ?)",
      [comments.score, comments.description, comments.user, comments.product_id]
    );

    console.log("esito");

    return comments;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
  return false;
};
