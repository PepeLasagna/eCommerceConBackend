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

const getCatProds = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT id, catID, name, description, cost, currency, soldCount, image FROM cat_products"
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

module.exports = { getCatProds };
