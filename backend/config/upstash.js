const Redis = require("@upstash/redis").Redis;
const { Ratelimit } = require("@upstash/ratelimit");
const dotenv = require('dotenv');
dotenv.config({
    quiet: true
});


const client = new Redis({
    url:process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,

});

const ratelimit = new Ratelimit(
    {
        redis: client,
        limiter: Ratelimit.slidingWindow(20, "10 s"),
        
    }
)

module.exports = { ratelimit};