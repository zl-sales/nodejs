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

router.get('/admin/other/slides', (req, res ) =>{
    res.render(path.join(rootpath, 'view/admin/other', 'slides.html'))
})




router.get('/admin/other/nav-menus', (req, res ) =>{
    res.render(path.join(rootpath, 'view/admin/other', 'nav-menus.html'))
})
router.get('/admin/other/settings', (req, res ) =>{
    res.render(path.join(rootpath, 'view/admin/other', 'settings.html'))
})



router.get('/admin/comment/comments', (req, res ) =>{
    res.render(path.join(rootpath, 'view/admin/comment', 'comments.html'))
})





// 导出router模块
module.exports = router;