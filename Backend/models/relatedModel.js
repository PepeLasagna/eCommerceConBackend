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

const getRelatedByID = async (id) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(
            "SELECT related_product_id, related_product_name, related_product_image FROM related_products WHERE product_id=?", [
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
module.exports = {getRelatedByID}