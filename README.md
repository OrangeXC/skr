# Blog

前端基于 Vue.js 2（全家桶 Vue-Resource，Vue-Router，Vuex），后端基于 express， mongodb 的博客展示及内容管理 App

## Description

* 博客的增删改
* 支持MarkDown语法编辑
* 支持移动端
* 支持代码高亮

## Develop

* 克隆远程库

```
git clone https://github.com/OrangeXC/blog.git
```

* 启动 mongodb 数据库
* 进入项目目录

```
cd blog
```

* 安装依赖

```
npm install
```

* 打包生成 (已经打包dist目录，可以省略)

```
npm run build
```

* 运行服务器

```
npm start
```
打开浏览器输入 http://localhost:3000/ ,打开账户建立页面，建立完毕，登入管理器

* 开发

```
npm run dev
```

* Eslint

```
npm run lint
```

> 注意: server目录下的init.json，初始化数据放在该文件中。

## Licence
MIT
