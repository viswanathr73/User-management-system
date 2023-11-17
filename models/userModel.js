const mongoose=require("mongoose")

const userModel= mongoose.Schema({

  name:{
       type:String,
       required:true

  },
  email:{
      type:String,
      required:true
  },
  mobile:{
      type:Number,
      required:true

  },
  password:{
        type:String,
        required:true
  },
  is_admin:{
        type:Number,
        default:0
  }

});
module.exports=mongoose.model("User",userModel)
