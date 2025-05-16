import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        isRequired: true
    },
    email: {
        type: String,
        isRequired: true,
        unique: true
    },
    password: {
        type: String,
        isRequired: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamps: true
})

const User = mongoose.model('User' , userSchema)


export default User