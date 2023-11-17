const User= require("../models/userModel")

const loadLogin = async(req,res)=>{
  try {

     res.render('login',{message :''});
     
  } catch (error) {
     console.log(error.message);
  }
}

const verifyLogin = async(req,res)=>{

  try {
     
   //   const email = req.body.email;
   //   const password = req.body.password;
     const{email,password}=req.body

     const userData = await User.findOne({email:email});

     if(userData){
        if(userData.password === password){
           if(userData.is_admin === 0){
              res.render('login',{message:'Invalid Admin'})
           }else{
              req.session.admin_id = userData._id;
              res.redirect('/admin/home');
           }
        }else{
           res.render('login',{message:'Invalid Admin'})
        }
     }else{
        res.render('login',{message:'Invalid Admin'})
     }

  } catch (error) {
     console.log(error.message);
  }

}

const loadhome = async(req,res)=>{
   try {
      res.render('home');
   } catch (error) {
      console.log(error.message)
   }
}


const logout = async(req,res)=>{
   try {
      req.session.admin_id = null;
      res.redirect('/admin')
   } catch (error) {
      console.log(error.message)
   }
}


const loadDashboard = async(req,res)=>{
  try {
    const usersData = await User.find({is_admin:0}).sort({name:1});
     res.render('dashboard',{users:usersData})
  } catch (error) {
     console.log(error.message)
  }
}

const loadAddUser = async(req,res)=>{
   try {

      res.render('newUser',{message:'',errMessage:''})

   } catch (error) {
      console.log(error.message)
   }
}

const addUser = async(req,res)=>{
   try {
     const checkData = await User.findOne({email:req.body.email});
     if(checkData){
      res.render('newUser',{message:'',errMessage:"User already founded"})
     }else{
      const user = new User({
         name:req.body.name,
         email:req.body.email,
         mobile:req.body.mobile,
         password:req.body.password
      })
      
      const userData = await user.save()
      if(userData){
         res.redirect('/admin/dashboard');
      }
     }
      

   } catch (error) {
      console.log(error.message)
   }
}


const editUserLoad = async (req, res) => {
   try {
      const id = req.query.id;
      const userData = await User.findById({ _id: id });

      if (userData) {
         res.render('editUser', { user: userData, errorMessage: '' }); // Initialize errorMessage as an empty string
      } else {
         res.redirect('/admin/dashboard');
      }
   } catch (error) {
      console.log(error.message);
   }
};


const updateUser = async (req, res) => {
   try {
      const userId = req.query.id; // Use req.query.id to get the user's ID from the query string
      const newEmail = req.body.email;

      // Check if the new email already exists in the database
      const emailExists = await User.findOne({ email: newEmail, _id: { $ne: userId } });

      if (emailExists) {
         // The email already exists for another user, handle this case as needed
         // You can redirect back to the editUser page with an error message
         return res.render('editUser', {
            user: { _id: userId, name: req.body.name, email: req.body.email, mobile: req.body.mobile },
            errorMessage: 'Email already exists in the database.'
         });
      }

      // Update the user's data if the email is not already in use
      const userData = await User.findByIdAndUpdate(
         { _id: userId },
         { $set: { name: req.body.name, email: req.body.email, mobile: req.body.mobile } }
      );

      res.redirect('/admin/dashboard');
   } catch (error) {
      console.log(error.message);
   }
};

const deleteUser = async(req,res)=>{
   try {
   const userData = await User.findOneAndRemove({_id:req.query.id});
   res.redirect('/admin/dashboard');
   } catch (error) {
      console.log(error.message)
   }
}

const searchUser = async(req,res)=>{
   try {
      const name =( req.body.name);
      const usersData = await User.find({is_admin:0,name:{$regex:name,$options :'i'}}).sort({name:1});
         res.render('dashboard',{users:usersData});
   } catch (error) {
      console.log(error.message)
   }
}




module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  loadhome,
  loadAddUser,
  addUser,
  editUserLoad,
  updateUser,
  deleteUser,
  searchUser
}