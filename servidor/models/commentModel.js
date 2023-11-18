const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "jap",
  connectionLimit: "5",
});

const getComments = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    const [comments] = await conn.query(
      'SELECT * FROM comments WHERE prod_id = ?',
      [id]
    )
    return comments
  } catch (error) {
    console.log(error)
  } finally {
    if (conn) {
      conn.release()
    }
  }
}

const postComment = async (comment) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(
      'INSERT INTO comments (score, description, date_time, prod_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [
        comment.score,
        comment.description,
        comment.date_time,
        comment.prod_id,
        comment.user_id,
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

const modifyComment = async (comment) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(
      'UPDATE comments SET (score, description) VALUES (?, ?, ?) WHERE prod_id=? AND user_id=?',
      [comment.score, comment.description, comment.prod_id, comment.user_id]
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

const deleteComment = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query('DELETE FROM comments WHERE prod_id=? AND user_id', [
      id.prod_id,
      id.user_id,
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

module.exports = { getComments, postComment, modifyComment, deleteComment }
