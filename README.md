# graduation-shop

## 服务端 -- egg-server

### Development

- 数据库修改路径

```bash
\config\config.default.js

config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'shop',
    host: '47.107.177.181',
    port: '3306',
    username: 'root',
    password: 'gudanboke',
    timezone: '+08:00',
  };
```
- 启动

```bash
$ npm install
$ npm run dev
$ open http://localhost:7001/
```







## 管理端 -- vue-manage-system

- 修改服务端路径

```bash
\src\main.js

Vue.prototype.baseURL = 'http://127.0.0.1:7001';
```


- 本地调试

```bash
$ npm install
$ npm run serve
```

- 打包（打包到服务器用）

```bash
$ npm run build
```

## 用户端 -- shop

-  hbuilder打开
- 修改服务端路径

```bash
\common\common.js

const websiteUrl = 'http://localhost:7001';
```

