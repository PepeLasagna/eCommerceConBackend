const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "jap",
  connectionLimit: "5",
});

const getUser = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    const user = await conn.query(
      'SELECT FROM users name, second_name, last_name, second_last_name, email, password, phone, img WHERE id=?',
      [id]
    )
    return user
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
  return false
}

const createUser = async (user) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(
      'INSERT INTO users (email, password, first_name, second_name, last_name, second_last_name, phone, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user.email,
        user.password,
        user.first_name,
        user.second_name,
        user.last_name,
        user.second_last_name,
        user.phone,
        user.avatar,
      ]
    )
    return user
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
  return false
}

const modifyUser = async (user) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(
      'UPDATE users SET (email, password, first_name, second_name, last_name, second_last_name, phone, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user.email,
        user.password,
        user.first_name,
        user.second_name,
        user.last_name,
        user.second_last_name,
        user.phone,
        user.avatar,
      ]
    )
    return true
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
  return false
}

const deleteUser = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query('DELETE FROM users WHERE id=?', [id])
    return true
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
  return false
}

module.exports = { getUser, createUser, modifyUser, deleteUser }
