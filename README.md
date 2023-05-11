# Airbnb-API

Airbnb-API 是 Airbnb 接口。拥有房源搜索、地区房源、更多地区房源、房源详情、个人信息的 API ，采用 REST 设计风格。

> 如果对您有帮助，可以给 [Airbnb-API 存储库](https://github.com/coder-hxl/airbnb-api) 点个 star 支持一下！

## 技术栈

`NodeJS` `TypeScript` `MySQL` `Koa` `Esbuild` `jsonwebtoken`  `Dotenv` `x-crawl`

## API 文档

API 文档: https://documenter.getpostman.com/view/19782726/2s8Z6yWsaF

## 如何运行

1. 没有 pnpm ？

   ```shell
   npm install pnpm -g
   ```

2. 安装依赖（运行完该命令就可以进入步骤 3）

   ```shell
   pnpm add .
   ```

3. 在 MySQL 创建一个名为 airbnb 的数据库，然后将 database/airbnb .sql 文件导入进去

4. 配置 .env 文件

   ```shell
   APP_HOST=http://localhost # 项目运行的主机
   APP_PORT=9001 # 项目运行的端口号

   MYSQL_HOST=localhost # MySQL 运行的主机
   MYSQL_PORT=3306 # MySQL 运行的端口号
   MYSQL_USER=root # MySQL 用户名
   MYSQL_PASSWORD=root # MySQL 密码
   MYSQL_DATABASE=airbnb # MySQL 数据库名称

   # 无 upload 文件可以使用 github 图床
   # 注意: 如果使用到 上传图片文件接口 时, 建议设置为 false , 否则图片文件还是会从 github 图床获取
   USE_GITHUB_REP=true  # Value: true / flase
   ```

5. 启动

   ```shell
   pnpm start
   ```

## 前端

Airbnb Github 地址: https://github.com/coder-hxl/airbnb

Airbnb Gitee 地址: https://gitee.com/coderhxl/airbnb
