import { catchAsyncErrors } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js"


export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });

    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400));
    }

    const { title, description, category, country, city, location, fixedSalary, salaryTo, salaryFrom } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("please provide full job details ", 400));
    }
    if ((!salaryTo || !salaryFrom) && !fixedSalary) {
        return next(new ErrorHandler("please either provide fixed salary or ranged salary"));
    }
    if (salaryTo && salaryFrom && fixedSalary) {
        return next(new ErrorHandler(" cannot either fixed salary or ranged salary together"));
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryTo, salaryFrom, postedBy
    })

    res.status(200).json({
        success: true,
        message: "Job posted Successfully!",
        job
    })

})

export const getmyJobs = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400));
    }

    const myjobs = await Job.find({ postedBy: req.user._id });

    res.status(200).json({
        success: true,
        myjobs
    })
})

export const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops!! Job not Found", 404));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new : true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message : "Job Updated Successfully!!"
    })

})

export const deleteJob = catchAsyncErrors(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400));
    }

    const {id} = req.params;  
      let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops!! Job not Found", 404));
    }
  await job.deleteOne();
  res.status(200).json({
    success : true,
    message : "Job deleted successfully"
  })   
})
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });