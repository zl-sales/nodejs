
// 加载express模块
const express = require('express');

// 创建服务器
const app = express();


// 启动服务器
app.listen(3000, () => {
    console.log('alishow is running...')
})

// 挂载静态资源  使用系统自带的唯一中间件static
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('../../../node_modules', express.static('./node_modules'));
app.use('/upload', express.static('./upload'));
// app.use('/upload', express.static('./view/upload'));

//加载body-parser 模块
const bp = require('body-parser')

// 将其注册为中间件   使用这个中间件必须使用这个语句
app.use(bp.urlencoded({ extended: false }));


// 加载模板引擎模块
const template = require('express-art-template');

// 加载url模块
const url = require('url')

// 使用模板引擎必写的一句
app.engine('html', template);

// 加载session模块   将其注册为中间件
const session = require('express-session')
app.use(session({
    secret: '78iuewdhbjs132ed',
    resave: false,
    saveUninitialized: false
}))


global.rootpath = __dirname;

// 加载router模块  自定义模块  路由模块  router文件中监听路由
const router_cate = require('./router/router-cate.js');

const router_user = require('./router/router-user.js');

const router_center = require('./router/router-center.js');

const router_post = require('./router/router-post.js');

const router_other= require('./router/router-other.js');


// 加载api文件   将其注册为中间件   使用文件中的路由监听
const api = require('./api.js')
app.use(api)


// 在上面加载过session模块后，使用自定义的checksession中间件  监听seesion
app.use(checksession);

// 将router模块注册为中间件

app.use(router_cate);

app.use(router_user);

app.use(router_center);

app.use(router_post);

app.use(router_other);

function checksession(req, res, next) {
    const urls = [
        '/admin/login','/api/login/checklogin','/index','/detail','/list'
    ]
    const urlobj = url.parse(req.url,true)
    if (!urls.includes(urlobj.pathname) ) {
        if (req.session.isLogin != true) {
            return res.redirect('/admin/login')
        }
    }
    next();
}