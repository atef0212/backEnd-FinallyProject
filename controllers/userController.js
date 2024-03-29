import userModel from "../models/userSchema.js";
const getUser= async (req, res)=>{
   
    try{
        let users=await userModel.find()
        if(users.lenght < 0){
            res.status(404).json({ msg: "No users found" });
        } else {
            res.status(200).json({users});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const addUser= async (req, res)=>{
   
    try{
        const userData=req.body
        const newUser= await userModel.create(userData)
        res.status(201).json({ msg: "New user added", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
export {addUser, getUser}