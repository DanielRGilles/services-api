const pool = require('../utils/pool');

module.exports = class Picture {
  id;
  url;
  user_name;
  
  constructor(row) {
    this.id = row.id;
    this.user_name = row.user_name;
    this.url = row.url;
  }

  static async createUser({ user_name, url }) {
    const { rows } = await pool.query(
      'INSERT INTO users (user_name, url) VALUES ($1, $2) RETURNING *;',
      [user_name, url]
    );
    return new Picture(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM users'
    );
    return rows.map(row => new Picture(row));
  }

};
