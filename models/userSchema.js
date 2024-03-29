import mongoose from "mongoose"
const userSch= new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  //  image: { type: String, required: true },

})
 const userModel=mongoose.model("user", userSch)
 export default userModel