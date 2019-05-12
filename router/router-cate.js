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



// 监听路由  显示用户前台界面 view/index.html
router.get('/index', (req, res) => {

    const sql = `   select * from ali_cate;
                    select * from ali_article order by rand() limit 0,5;
                    select * from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
                    select * from ali_pic;
                    select * from ali_article order by article_click desc limit 0,5;
                    SELECT * FROM ali_article
                    JOIN ali_admin ON article_adminid = admin_id
                    JOIN ali_cate ON article_cateid = cate_id
                    ORDER BY  article_addtime desc
                    LIMIT 0,3;
                    select article_id,article_title,article_file from ali_article order by article_good desc limit 0,4;
                    select * from ali_comment
                    JOIN ali_member ON cmt_memid = member_id
                    order by cmt_addtime desc
                     `;//JOIN ali_admin ON cmt_articleid = admin_id 
                    // WHERE cmt_state='已批准'
    conn.query(sql, (err, result) => {
        const data = {
            cate: result[0],
            rand: result[1],
            news: result[2],
            pic: result[3],
            top: result[4],
            hots: result[5],
            tuijian: result[6],
            cmt: result[7]
        }
        // console.log(result[7])
        res.render(path.join(rootpath, 'view', 'index.html'), data)
    })
})
// 监听路由  显示用户详情界面 view/detail.html
router.get('/detail', (req, res) => {
    const id=req.query.id
    const sql = `select * from ali_cate;
                    select * from ali_article order by rand() limit 0,5;
                    select * from ali_comment
                    JOIN ali_member ON cmt_memid = member_id;
                    select article_id,article_title,article_file from ali_article order by article_good desc limit 0,4;
                    select * from ali_article 
                    join ali_cate on article_cateid = cate_id 
                    join ali_admin on article_adminid = admin_id 
                    where article_id = ${id}`
    conn.query(sql,(err,result) =>{
        const data = {
            cate: result[0],
            rand: result[1],
            cmt: result[2],
            tuijian: result[3],
            article:result[4][0]
        }
        // console.log(result[4])
        res.render(path.join(rootpath, 'view', 'detail.html'),data)
    })
})
// 监听路由  显示用户列表界面 view/list.html
router.get('/list', (req, res) => {
    const id = req.query.id
    console.log(id)
    const sql = `select * from ali_article
                    JOIN  ali_cate ON cate_id = article_cateid
                    JOIN ali_admin ON admin_id = article_adminid
                    where article_cateid=${id};
                    select * from ali_cate;
                    select * from ali_article order by rand() limit 0,5;
                    select * from ali_comment
                    JOIN ali_member ON cmt_memid = member_id`
                    // JOIN ali_admin ON cmt_articleid = admin_id
    conn.query(sql, (err, result) => {
        // console.log(result)

        const data = {
            tuijian: result[0],
            cate: result[1],
            rand: result[2],
            cmt: result[3]
        }
        console.log(result[0])
        if (err) {
            return res.render(path.join(rootpath, 'view', 'list.html'))
        }
        res.render(path.join(rootpath, 'view', 'list.html'), data)
    })

})

// 监听路由  显示后台登录界面 view/admin/index.html
router.get('/admin/index', (req, res) => {
    res.render(path.join(rootpath, 'view', 'admin', 'index.html'), { list: req.session.Info })
})

// 监听路由  显示后台登录界面 view/admin/login.html
router.get('/admin/login', (req, res) => {
    res.render(path.join(rootpath, 'view', 'admin', 'login.html'))
})

// 监听路由  显示后台cate界面 view/admin//cate/cate.html
router.get('/admin/cate/cate', (req, res) => {
    res.render(path.join(rootpath, 'view', 'admin', 'cate', 'cate.html'))
})

// 监听路由  显示后台addcate界面 view/admin/cate/addcate.html
router.get('/admin/cate/addcate', (req, res) => {
    res.render(path.join(rootpath, 'view', 'admin', 'cate', 'addcate.html'))
})


// 监听路由  显示后台addcate界面 view/admin/cate/addcate.html
router.get('/admin/cate/getCate', (req, res) => {
    const sql = `select * from ali_cate`;

    conn.query(sql, (err, result) => {
        if (err) {
            return res.send(err)
        }
        res.send({ code: 201, message: '查询成功', data: result })
    })
    // res.render(path.join(rootpath,'view','admin','cate','addcate.html'))
})

// 监听路由   获取addcate  网页点击后表单提交的数据  并将其添加到数据库
router.post('/admin/cate/addCateDeal', (req, res) => {

    // console.log(req.body)
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    const sql = `insert into ali_cate set ?`

    conn.query(sql, data, (err, result) => {
        if (err || result.addectedRows != 1) {
            // console.log(err)
            return res.send({ code: 201, message: '添加失败' })
        }
        res.send({ code: 200, message: '添加成功' })
    })
})

router.get('/admin/cate/dele', (req, res) => {
    let id = req.query.id;

    const sql = `delete  from  ali_cate  where cate_id=?`
    conn.query(sql, id, (err, result) => {
        if (err) {
            res.send({ code: 200, message: '删除失败' })
        } else {
            res.send({ code: 201, message: '删除成功' })
        }
    })

})

router.get('/admin/cate/editcate', (req, res) => {
    const id = req.query.id
    // console.log(id)
    const sql = `select * from ali_cate where  cate_id=? `
    conn.query(sql, id, (err, result) => {
        if (err) {
            return res.render(path.join(rootpath, 'view', 'admin', 'cate', 'editcate.html'), { code: 200, message: '没有信息' })
        }
        res.render(path.join(rootpath, 'view', 'admin', 'cate', 'editcate.html'), result[0])

    })



})

router.post('/admin/cate/modifycate', (req, res) => {
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon
    }
    const id = req.body.id

    const sql = `update ali_cate set ? where cate_id=?`

    conn.query(sql, [data, id], (err, result) => {
        if (err) {
            return res.send({ code: 200, message: '修改失败' })
        }
        res.send({ code: 201, message: '修改成功' })
    })


    // res.render(path.join(rootpath,'view','admin','cate','editcate.html'))    
})















// 导出router模块
module.exports = router;