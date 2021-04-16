const {
    Source_conect
} = require("../../util/mysql_conect.js");






class source_mysqlModel {
    static async query_table(data) {
        let opt = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'yjh123456',
            database: 'koa_error',
            useConnectionPooling: true,
        };
        let source_conect = new Source_conect(opt);
        let sql = `select * from information_schema.columns
        where table_name = 'user';`;

        return await source_conect.Query(sql);
    }

    // 获取指标

    static async query_mysql(opt,sql) {
      


        // let opt = {
        //     host: 'localhost',
        //     port: 3306,
        //     user: 'root',
        //     password: 'yjh123456',
        //     database: 'koa_error',
        //     useConnectionPooling: true,
        // };

        // let sql = `select * from user;`;

        
        let source_conect = new Source_conect(opt);
      

       

        return await source_conect.Query(sql);
    }

    // 数据库连接测试
    static async conect_mysql(data) {
        let opt = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'yjh123456',
            database: 'koa_error',
            useConnectionPooling: true,
        };
        let source_conect = new Source_conect(opt);


        return await source_conect.test();


    }
}

module.exports = source_mysqlModel;