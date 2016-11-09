# Blog

前端基于 Vue.js 1.x（全家桶 Vue-Resource，Vue-Router，Vuex），后端基于 express， mongodb 的博客展示及内容管理 App

## Description

* 权限管理（游客与admin）
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

* 进入服务器所在文件夹并运行服务器

```
cd server
node www
```

* 打开浏览器输入 http://localhost:3000/， 如果一切OK，则进入博客的列表页面，登陆按钮在最下方。

> 注意
**第一次从node启动时，数据库会初始化，自动插入两个用户，分别是和'admin'，'游客'，前者有管理员权限，默认密码是111**
如果需要改动，则在第一次启动前打开server目录下的`init.js`，初始化数据放在该文件中。
