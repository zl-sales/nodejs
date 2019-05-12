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

router.get('/admin/user/users', (req, res) => {
    const sql = `select * from ali_admin order by admin_id`;

    conn.query(sql, (err, result) => {
        if (err) return res.render(path.join(rootpath, 'view', 'admin/user', 'users.html'), { code: 200, message: '没有栏目信息' })

        res.render(path.join(rootpath, 'view', 'admin/user', 'users.html'), { list: result ,user :req.session.userInfo})
    })
})


router.get('/admin/user/adduser', (req, res) => {

    res.render(path.join(rootpath, 'view', 'admin/user', 'adduser.html'))

})

router.post('/admin/user/adduserdeal', (req, res) => {
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.pwd,
        admin_pic: req.body.pic,
        admin_tel: req.body.tel
    }
    // console.log(data)
    const sql = `insert into ali_admin set ?`

    conn.query(sql, data, (err, result) => {
        if (err) {
            return res.send({ code: 200, message: '添加失败' })
        }
        res.send({ code: 201, message: '添加成功' })
    })
})

router.get('/admin/user/deleteuser', (req, res) => {

    const id = req.query.id;

    const sql = `delete  from  ali_admin  where admin_id=?`

    conn.query(sql, id, (err, result) => {
        if (err) {
            return res.send({ code: 200, message: '删除失败' })
        }
        res.send({ code: 201, message: '删除成功' })
    })
})

router.get('/admin/user/edituser', (req, res) => {
    const id = req.query.id
    // console.log(id)
    const sql = `select * from ali_admin where  admin_id=? `
    conn.query(sql, id, (err, result) => {
        if (err) {
            return res.render(path.join(rootpath, 'view', 'admin', 'user', 'edituser.html'), { code: 200, message: '没有信息' })
        }
        res.render(path.join(rootpath, 'view', 'admin', 'user', 'edituser.html'), { list: result })
        // console.log(result)
    })
})




router.post('/admin/user/edit', (req, res) => {
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pic: req.body.pic,
        admin_pwd: req.body.pwd,
        admin_tel: req.body.tel
    }
    console.log(data)
    const id = req.body.id;
    console.log(id)
    const sql = `update ali_admin set ? where admin_id=?`

    conn.query(sql, [data, id], (err, result) => {
        if (err) {
            return res.send({ code: 200, message: '修改失败' })
        }
        res.send({ code: 201, message: '修改成功' })
    })



})

router.post('/admin/user/delusers',(req, res) =>{
    const id = req.body.id;
    console.log(id)
    const sql = `delete from ali_admin where admin_id in (?)`
    conn.query(sql,id,(err,result) =>{
        if(err){
            return res.send({code:200, message:'删除失败'})
        }
        return res.send({code:201, message:'删除成功'})

    })
})


router.get('/admin/login', (req, res) =>{
    res.render(path.join(rootpath, 'view', 'admin', 'login.html'))    
})




module.exports = router;