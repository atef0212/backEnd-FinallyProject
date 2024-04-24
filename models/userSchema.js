import mongoose from "mongoose"
const genders = ['male', 'female', 'other'];




const userSch= new mongoose.Schema({
    name: { type: String,  },
    age: { type: Number , min: 1, max: 99},
    tall: { type: Number, min: 1 },
   land: { type: String },
    gender: {
       type: String,
       enum: genders
 },
 //image: { type: String, required: true },

    email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },

  content:[{type: mongoose.Types.ObjectId, required:true, ref: "content"}]


})




 const userModel=mongoose.model("user", userSch)
 export default userModel