import userModel from "../models/userSchema.js";
import bcrypt from 'bcrypt'
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

const addUser= async (req, res)=> {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with hashed password
        const newUser = await userModel.create({name, email, password: hashedPassword });

        res.status(201).json({ msg: 'New user added', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
export {addUser, getUser}