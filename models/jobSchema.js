import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide job title"],
        minLength: [3, "job title must contain at least 3 character"],
        maxLength: [50, "job title must contain at most 50 character"]
    },
    description: {
        type: String,
        required: [true, "please provide job description"],
        minLength: [30, "job description must contain at least 30 character"],
        maxLength: [350, "job description must contain at most 350 character"]
    },
    category: {
        type: String,
        required: [true, "please provide category"]
    },
    country: {
        type: String,
        required: [true, "please provide country"]
    },
    city: {
        type: String,
        required: [true, "please provide city"]
    },
    location: {
        type: String,
        required: [true, "please provide exact location"],
        minLength: [30, "job location must contain at least 30 character"],
    },
    fixedSalary:{
        type: Number,
        minLength:[4,"fixed salary must contain at least 4 digit"],
        maxLength :[9,"fixed salary cannot exceed 9 digit"]
    },
    salaryFrom:{
        type: Number,
        minLength:[4,"salary from must contain at least 4 digit"],
        maxLength :[9,"salary from  cannot exceed 9 digit"]
    },
    salaryTo:{
        type: Number,
        minLength:[4,"salary TO must contain at least 4 digit"],
        maxLength :[9,"salary to cannot exceed 9 digit"]
    },
    expired:{
        type:Boolean,
        default : false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref : "User"
    }
})

export const Job = mongoose.model("Job" , jobschema);   