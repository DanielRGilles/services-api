const pool = require('../utils/pool');

module.exports = class Picture {
  id;
  url
  explanation;
  copyright;
  date;
  media_type;
  title;
  

  constructor(row) {
    this.id = row.id;
    this.explanation = row.explanation;
    this.url = row.url
  }

  static async insert({ title, copyright, media_type, explanation, url }) {
    const { rows } = await pool.query(
      'INSERT INTO Pictures (title, copyright, media_type, explanation, url) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [title, copyright, media_type, explanation, url]
    );
    return new Picture(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM Pictures'
    );
    return rows.map(row => new Picture(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM Pictures WHERE id=$1;', [
      id,
    ]);
    
    if(!rows[0]) return null;
    return new Picture(rows[0]);
  }

  static async updateById(id, { title, copyright, media_type, explanation, url }) {
    const { rows } = await pool.query(
      'UPDATE Pictures SET title = $1, copyright = $2, media_type= $3, explanation = $4, url = $5 WHERE id = $6 RETURNING *',
      [title, copyright, media_type, explanation, url, id]
    );
    return new Picture(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM Pictures WHERE id = $1 RETURNING *;', [id]
    );
    if (!rows[0]) return null;
    return new Picture(rows[0]);
  }
};
