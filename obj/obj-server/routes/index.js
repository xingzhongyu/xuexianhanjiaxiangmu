const express = require('express');
const router = express.Router();
const md5=require('blueimp-md5')
const {UserModel,ChatModel}=require('../db/user')
const filter={password:0,__v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function(req,res){
    const {username,password,gender}=req.body
 UserModel.findOne({username},function(error,user){
   if(user){
     res.send({code:1,msg:'该用户已存在'})
   }else{
     new UserModel({username,password:md5(password),gender}).save(function(error,user){
         res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data = {username, gender,_id:user._id} 
        res.send({code: 0, data})
     })
   }
 })
})
router.post('/login',function(req,res){
  const {username,password}=req.body
  UserModel.findOne({username,password:md5(password)},filter,function(error,user){
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或密码错误'})
    }
  })
})
router.post('/update',function(req,res){
  const userid=req.cookies.userid
  if(!userid){
     return res.send({code:1,msg:'请先登录1'})}
     const user=req.body
    UserModel.findByIdAndUpdate({_id:userid},user,function(error,oldUser){
      if(!oldUser){
        res.clearCookie('userid')
        res.send({code:1,msg:'请先登录'})
      }else{
        const {_id,username,gender}=oldUser
        const data=Object.assign(user,{_id,username,gender})
      res.send({code:0,data})
      }
    })
})
router.get('/user',function(req,res){
  const userid=req.cookies.userid
  if(!userid){
     return res.send({code:1,msg:'请先登录1'})}
     UserModel.findOne({_id:userid},filter,function(error,user){
       res.send({code:0,data:user})
     })
})
router.get('/userlist',function(req,res){
  const {userid}=req.cookies
  if(!userid){
    return res.send({code:1,msg:'请先登录1'})}
    UserModel.find({_id:{'$ne':userid}},filter,function(error,users){
      res.send({code:0,data:users})
    })
})
router.get('/msglist',function(req,res){
  const userid=req.cookies.userid
  UserModel.find(function(err,userdocs){
    const users={}
    userdocs.forEach(doc=>{
      users[doc._id]={username:doc.username,header:doc.header}
    })
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(err,ChatMsgs){
      res.send({code:0,data:{users,ChatMsgs}})
    })
  })
})
router.post('/readmsg',function(req,res){
  const from=req.body.from
  const to=req.cookies.userid
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
    res.send({code:0,data:doc.nModified})
  })
})
module.exports = router;
