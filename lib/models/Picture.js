const pool = require('../utils/pool');

module.exports = class Picture {
  id;
  img_url;
  explanation;

  constructor(row) {
    this.id = row.id;
    this.explanation = row.explanation;
    this.img_url = row.img_url;
  }

  static async insert({ title, species, lifespan, explanation, img_url }) {
    const { rows } = await pool.query(
      'INSERT INTO Pictures (title, species, lifespan, explanation, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [title, species, lifespan, explanation, img_url]
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

  static async updateById(id, { title, species, lifespan, explanation, img_url }) {
    const { rows } = await pool.query(
      'UPDATE Pictures SET title = $1, species = $2, lifespan= $3, explanation = $4, img_url = $5 WHERE id = $6 RETURNING *',
      [title, species, lifespan, explanation, img_url, id]
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
