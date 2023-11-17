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

const getUser = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT FROM users name, second_name, last_name, second_last_name, email, password, phone, img WHERE id=?",
      [id]
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

const createUser = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO users name, second_name, last_name, second_last_name, email, password, phone, img VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ),
      [
        user.name,
        user.second_name,
        user.last_name,
        user.second_last_name,
        user.email,
        user.password,
        user.phone,
        user.img,
      ];
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

const modifyUser = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      "UPDATE users SET (name, second_name, last_name, second_last_name, email, password, phone, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.name,
        user.second_name,
        user.last_name,
        user.second_last_name,
        user.email,
        user.password,
        user.phone,
        user.img,
      ]
    );
    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
  return false;
};

module.exports = { getUser, createUser, modifyUser };
