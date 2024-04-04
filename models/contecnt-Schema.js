import mongoose from "mongoose"

const contentSchema= new mongoose.Schema({
   
 
    title: { type: String,required: true },
    description: { type: String, required: true  },
    image: { type: String, required: true },
   creator:{
    type: mongoose.Types.ObjectId,  ref:"user"
   }

})
 const contentModel=mongoose.model("content", contentSchema)
 export default contentModel