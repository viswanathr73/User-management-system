const express=require("express")
const userRouter=express();
const bodyParser=require("body-parser")
const session = require('express-session');
const nocache = require('nocache')
const logger = require('morgan')

const auth=require('../middleware/auth')
const  userController=require("../controllers/userContoller")
const config=require("../config/config")

userRouter.use(nocache());

userRouter.use(session({secret:config.sessionSecretId, resave: false}));




userRouter.set('view engine','ejs')
userRouter.set('views','./views/users')


userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended:true}))
userRouter.use(logger('dev'))


//registration user
userRouter.get('/register',auth.isLogout,userController.loadRegister)
userRouter.post('/register',userController.insertUser)

//login user
userRouter.get('/',auth.isLogout,userController.loginLoad)
userRouter.get('/login',auth.isLogout,userController.loginLoad)
userRouter.post('/login',auth.isLogout,userController.verifyLogin)

userRouter.get('/home',auth.isLogin,userController.loadHome)
userRouter.get('/logout',auth.isLogin,userController.userLogout);

module.exports=userRouter