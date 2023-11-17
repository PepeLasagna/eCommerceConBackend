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

const getCategories = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT id, name, description, productCount, imgSrc FROM categories"
    );
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
  return false;
};

module.exports = { getCategories };
