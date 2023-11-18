const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "jap",
  connectionLimit: "5",
});

const getCartByID = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    const cart = await conn.query(
      'SELECT * FROM cart WHERE user_id = ? AND status = ?',
      [id, 'pending']
    )
    return cart
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
  return false
}

const addItem = async (id, item) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(
      'INSERT INTO cart (user_id, prod_id, quantity) VALUES (?, ?, ?)',
      [id, item.product_id, item.quantity]
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

const removeItem = async (id, item) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query('DELETE FROM cart WHERE user_id = ? AND prod_id = ?', [
      id,
      item.prod_id,
    ])
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

const completeBuy = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query('UPDATE cart SET status = ? WHERE user_id = ?', [
      'completed',
      id,
    ])
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

module.exports = { getCartByID, completeBuy, addItem, removeItem }
