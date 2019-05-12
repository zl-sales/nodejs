// 加载express模块
const express = require('express');

// 创建服务器
const router = express.Router();

// 加载其他需要的模块
// 加载mysql模块  
const conn = require('../db.js')
// 加载path模块 
const path = require('path')
// 加载日期时间模块
const moment = require('moment')



router.get('/admin/post/addpost', (req, res) =>{
    res.render(path.join(rootpath,'view/admin/post','addpost.html'))
})

router.get('/admin/post/posts', (req, res) =>{
    res.render(path.join(rootpath,'view/admin/post','posts.html'))
})

module.exports = router;