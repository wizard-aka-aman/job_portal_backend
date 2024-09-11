class ErrorHandler extends Error{
    constructor(message , statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}


export const errorMiddleware=(err,req,res,next)=>{

    err.message = err.message || "internal error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `resource not found INVALID ${err.path}`;
        err = new ErrorHandler(message , 400);
    }
    if(err.code === 11000){
        const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message , 400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = `josn web token is invalid , Try Again`;
        err = new ErrorHandler(message , 400);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Tkoen Expire Error`;
        err = new ErrorHandler(message , 400);
    }

    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    });
};


export default ErrorHandler;