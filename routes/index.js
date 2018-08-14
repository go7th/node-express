var express = require('express');
var router = express.Router();


var session = require('express-session');
// var cookieParser = require('cookie-parser');


var FileStore = require('session-file-store')(session);
var identityKey = 'skey';
router.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));




/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.render('index', { title: '欢迎来到首页',show:true });
  }else{
    res.render('index', { title: '欢迎来到首页',show:false });
  }
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/loginyz', function(req, res, next) {
  console.log(req.body.user);
  if(req.body.user==1&req.body.pass==1){
    req.session.user = req.body.user;

    res.redirect('/');
  }
});
router.get('/reg', function(req, res, next) {
  res.render('reg');
});
router.post('/regyz', function(req, res, next) {
  res.send('账号密码都是1');
});
router.get('/logout', function(req, res, next) {
  req.session.user=null;
  res.redirect('/');
});

router.get('/about', function (req, res) {
  res.send('about');
});
module.exports = router;
