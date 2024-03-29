import { Model, Schema } from "mongoose";
const userSch= Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },

})
export const userModel=Model("user", userSch)