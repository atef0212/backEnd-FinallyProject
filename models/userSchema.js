import mongoose from "mongoose"
const genders = ['male', 'female', 'other'];
const userSch= new mongoose.Schema({
    name: { type: String, required: true },
    gender: {
      type: String,
      enum: genders,
      required: true,
    },
    email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  //  image: { type: String, required: true },

})
 const userModel=mongoose.model("user", userSch)
 export default userModel