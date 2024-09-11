import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required : [true,"please provide your name"],
        minlength:[3 , "Name must contain at least 3 characters!"],
        maxlength:[30 , "Name cannot exceed 30 characters!"]
    },
    email:{
        type: String,
        required : [true,"please provide your email"],
        validate : [validator.isEmail,"please provide a valid Email"]
    },
    phone:{
        type: Number,
        required : [true,"please provide your phone number"], 
        minlength:[10 , "Phone Number contain exact 10 numbers!"],
        maxlength:[10 , "Phone Number contain exact 10 numbers!"]
    },
    password:{
        type: String,
        required : [true,"please provide your password"],
        minlength:[8 , "password must contain at least 8 characters!"],
        maxlength:[32, "password cannot exceed 32 characters!"],
        select : false
    },
    role:{
        type: String,
        required : [true,"please provide your role"],
        enum:["Job Seeker" , "Employer"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

  // hasing the password
  userSchema.pre("save" , async function(next){
        if(!this.isModified("password")){
            next();
        }
        this.password = await bcrypt.hash(this.password , 10);

})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

// generating a jwt token

userSchema.methods.geJWTTOKEN =   function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User" , userSchema);