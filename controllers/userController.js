import userModel from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUser = async (req, res) => {
    try {
        let users = await userModel.find();
        if (users.length < 1) {
            res.status(404).json({ msg: "No users found" });
        } else {
            res.status(200).json({ users });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const updateUserData = async (req, res, next) => {
    const { old, tall, land, gender } = req.body;
    const userIdToUpdate = req.params.uid;

    try {
        const existingUser = await userModel.findById(userIdToUpdate);

        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update user data
        existingUser.old = old;
        existingUser.tall = tall;
        existingUser.land = land;
        existingUser.gender = gender;

        // Save the updated user data
        await existingUser.save();

        // Send response
        res.status(200).json({ msg: "User data updated successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error updating user data:", error);
        res.status(500).json({ msg: "Internal Server Error" });
        next(error);
    }
};

const signUp = async (req, res) => {
    try {
        const { name,old, tall, land, gender, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with hashed password
        const newUser = await userModel.create({
            old, tall, land, gender,
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
            },
            "secretKey",
            { expiresIn: "1h" }
        );

        res.status(201).json({ msg: "New user added", user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Invalid username or password" });
        }
        // Compare the provided password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid username or password" });
        }

        // If logIn is successful, generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            "secretKey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ userId: user.id, email: user.email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res, next) => {
    const userIdDelete = req.params.uid;

    try {
        const existingUser = await userModel.findById(userIdDelete);

        if (!existingUser) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        await existingUser.deleteOne();

 
        res.status(200).json({ msg: "User data deleted successfully" });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};


export { signUp, getUser, logIn, updateUserData, deleteUser };
