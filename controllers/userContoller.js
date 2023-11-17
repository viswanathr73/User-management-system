
const User= require("../models/userModel")


const loadRegister = async(req,res)=>{
  try {
     
     res.render('register',{message:'',errMessage:''})

  } catch (error) {
     console.log(error.message)
  }
}

const insertUser=async(req,res)=>{
   try{
      const email = req.body.email
      const checkData = await User.findOne({email:email});
      if(checkData){
         res.render('register',{errMessage:'User already founded',message:''});
      }else{
         const user=new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            is_admin:0 
         })
   
         const userData=await user.save()
         if(userData){
   
            res.render('login',{message:"Registration successfull",errMessage:''})
         }
      }
      
   }catch(error){
      console.log(error.message) 
   }
}


//login

const loginLoad=async(req,res)=>{
   try{
      res.render('login',{message:''})

   }catch(error){
      console.log(error.message);
   }
}

//verify login

const verifyLogin = async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email: email });

      if (user) {
         if (user.password === password) {
            req.session.user_id = user._id;
            res.redirect('/home');
         } else {
            res.render('login', { message: 'Invalid email or password' });
         }
      } else {
         res.render('login', { message: 'Invalid email or password' });
      }
   } catch (error) {
      console.log(error.message);
   }
};


//home

const loadHome = async (req, res) => {
   try {
      
      const user = await User.findById(req.session.user_id);
      if (user) {
         res.render('home', { user: user }); 
      } else {
         res.redirect('/login'); 
      }
   } catch (error) {
      console.log(error.message);
   }
};


//logout

const userLogout = async(req,res)=>{
   try {
      req.session.user_id = null;
      res.redirect('/');
   } catch (error) {
      console.log(error.message);
   }
}


module.exports={
   loadRegister,
   insertUser,
   loginLoad,
   verifyLogin,
   loadHome,
   userLogout
}