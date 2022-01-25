const pool = require('../utils/pool');

module.exports = class Picture {
  id;
  img_url;
  user_name;

  constructor(row) {
    this.id = row.id;
    this.user_name = row.user_name;
    this.img_url = row.img_url;
  }

  static async createUser({ user_name, img_url }) {
    const { rows } = await pool.query(
      'INSERT INTO users (user_name,img_url) VALUES ($1, $2) RETURNING *;',
      [user_name, img_url]
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
