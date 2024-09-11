import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true , "please provide your name"],
        minLength : [3, "name must contain atleast 3 character"],
        maxlength  : [30 , "name cannot excced 30 character"]
    },
    email:{
        type:String,
        validator : [validator.isEmail , "please provide a valid email"],
        required : [true , "please provide your email"],
    },
    coverLetter:{
        type:String,
        required : [true , "please provide your cover Letter"]
    },
    phone:{
        type:Number,
        required : [true , "please provide your phone number"],
        minLength : [10, "phone number have exact 10 numbers"],
        maxlength  : [10 , "phone number have exact 10 numbers"]
    },
    address:{
        type:String,
        required : [true , "please provide your Address"]
    },
    resume:{
        public_id:{
            type:String,
            required : true
        },
        url :{
            type:String,
            required : true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref :"User",
            required : true
        },
        role :{
            type:String,
            enum : ["Job Seeker"],
            required : true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref :"User",
            required : true
        },
        role :{
            type:String,
            enum : ["Employer"],
            required : true
        }
    }

})

export const Application = mongoose.model("Application" , applicationSchema);
