const ratelimit = require("../config/upstash").ratelimit;

const ratelimiter = async (_,res,next)=>{

    try {
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) {
            return res.status(429).json({message: "Too many requests, please try again later."});
        }
        next()
    }
    catch (error){
        console.log("Rate limiting error:" ,error)
        next(error);
    }

    
}

module.exports = ratelimiter;

