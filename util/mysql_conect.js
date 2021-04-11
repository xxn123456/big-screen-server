const mysql = require('mysql');
const { resolve } = require('path');

class Source_conect {
    constructor(opt) {
        this.host = opt.host;
        this.port = opt.port || 3306;
        this.user = opt.user;
        this.password = opt.password;
        this.database = opt.database;
        this.conect_mysql =  mysql.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                database: this.database,
                useConnectionPooling: true,
            });
    }
    Query(sql){
        return new Promise((resolve, rejecte)=>{
            this.conect_mysql.query(sql, (err, res, fields) => {
                resolve (res)
            });

        })
    }
    test(){
        return new Promise((resolve, rejecte)=>{
            this.conect_mysql.connect((err) => {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                  }
                
                resolve (this.conect_mysql.threadId)
            });

        })

    }
  
  
  
}

module.exports={
        Source_conect
    }