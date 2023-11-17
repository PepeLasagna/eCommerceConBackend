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

const getProducts = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT id, name, description, cost, currency, soldCount, catName, image1, image2, image3, image4 FROM products"
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



const getProductByID = async (id) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(
            "SELECT id, name, description, cost, currency, soldCount, catName, image1, image2, image3, image4 FROM products WHERE id=?", [
                id
            ]
        )
     return result
    } catch (error) {
        console.log(error);        
    } finally{
        if(conn){
            conn.release()
        }};
    return false;

}
module.exports = { getProducts, getProductByID}