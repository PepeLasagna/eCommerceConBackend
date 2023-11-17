
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
  
  
  const getCartByID = async (id) => {
      let conn;
      try{
          conn = await pool.getConnection();
          const result = await conn.query(
            "SELECT user_id, product_id, product_name, count, unit_cost, currency, image FROM shopping_cart WHERE user_id=?", [
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


  const addItem = async (id, product) => {
    let conn;
      try{
          conn = await pool.getConnection();
          const result = await conn.query(
              "INSERT INTO shopping_cart (user_id, product_id, product_name, count, unit_cost, currency, image) VALUE (?, ?, ?, ?, ?, ?, ?)", [
                  id, product.product_id, product.name, product.count, product.cost, product.currency, product.image1
              ]
          )
       return tarea
      } catch (error) {
          console.log(error);        
      } finally{
          if(conn){
              conn.release()
          }
      }
      return false
  }

  module.exports = {getCartByID, addItem }