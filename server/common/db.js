const db_config = require('./../../config/db');

class Db {
  constructor(){


    this.driver = require('mysql');
    this.pool = this.driver.createPool(db_config);
    //initial sql requests
    this.initialSQL = [
      "DROP TABLE IF EXISTS users",
      "CREATE TABLE users (id INTEGER AUTO_INCREMENT, name VARCHAR(20) NOT NULL DEFAULT 'NULL', fname VARCHAR(20) NOT NULL DEFAULT 'NULL', login VARCHAR(20) NOT NULL DEFAULT 'NULL', password VARCHAR(20) NOT NULL DEFAULT 'NULL', mail VARCHAR(20) NOT NULL DEFAULT 'NULL', img_avatar VARCHAR(100) NULL DEFAULT NULL, PRIMARY KEY (id))",
      "DROP TABLE IF EXISTS news",
      "CREATE TABLE news (id INTEGER AUTO_INCREMENT, header VARCHAR(30) NOT NULL DEFAULT 'NULL', body VARCHAR(300) NOT NULL DEFAULT 'NULL', date DATETIME NOT NULL DEFAULT NOW(), id_users INTEGER NULL DEFAULT NULL, img_src VARCHAR(300) NULL DEFAULT NULL, PRIMARY KEY (id))",
      "ALTER TABLE news ADD FOREIGN KEY (id_users) REFERENCES users (id)"
    ]


  }

  initialization() {
    this.pool.getConnection((conn_error , conn) => {
      if (conn_error) conn_error;
      for(let i = 0 ; i <= this.initialSQL.length - 1 ; i++){
        console.log('dsa')
        conn.query(this.initialSQL[i] , (err) => {
          if(err) console.log(err);
        });
      }
      conn.release();

    })
  }

  query(sql) {
    return new Promise((resolve, reject) =>{
      this.pool.getConnection((conn_error, conn)=>{
        if (conn_error) reject(conn_error);
        conn.query(sql , (err , records) => {
          if(err) reject(err);
            conn.release();
            resolve(records);
        });
      })
    })
  }


}

module.exports = new Db();