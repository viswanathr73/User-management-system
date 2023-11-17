const express=require("express")
const adminRouter=express();

const session = require('express-session');
const config=require("../config/config")
adminRouter.use(session({secret:config.sessionSecretId, resave: false}));

const bodyParser=require("body-parser")
adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({extended:true}))


adminRouter.set('view engine','ejs')
adminRouter.set('views','./views/admin')

const auth = require('../middleware/adminAuth');
const adminController=require("../controllers/adminController")
adminRouter.get('/',auth.isLogout,adminController.loadLogin)
adminRouter.post('/',adminController.verifyLogin)
adminRouter.get('/home',auth.isLogin,adminController.loadhome);
adminRouter.get('/dashboard',auth.isLogin,adminController.loadDashboard)
adminRouter.get('/logout',auth.isLogin,adminController.logout);
adminRouter.get('/newUser',auth.isLogin,adminController.loadAddUser);
adminRouter.post('/newUser',auth.isLogin,adminController.addUser);
adminRouter.get('/editUser',auth.isLogin,adminController.editUserLoad);
adminRouter.post('/editUser',auth.isLogin,adminController.updateUser);
adminRouter.get('/deleteUser',auth.isLogin,adminController.deleteUser);
adminRouter.post('/searchUser',auth.isLogin,adminController.searchUser);



adminRouter.get('#',(req,res)=>{
  res.redirect('/admin')
})

module.exports=adminRouter