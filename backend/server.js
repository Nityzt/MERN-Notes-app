const express = require('express');
const app = express();
const {connectDB} = require('./config/db.js');
const dotenv = require('dotenv');
const path = require("path");
const notesRoutes = require('./routes/notesRoutes.js'); // Assuming you have a notes route file
const ratelimiter = require('./middleware/rateLimiter.js');
const cors = require('cors');
dotenv.config({
    quiet: true
});
const PORT = process.env.PORT || 5001;

if(process.env.NODE_ENV !== "production"){
app.use(cors(process.env.CORS_ORIGIN || 'http://localhost:5173'));}
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(ratelimiter); // Apply rate limiting middleware
app.use((req,res,next)=>{
    console.log(`${req.method} request made to ${req.url}`);
    next()
})

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}

connectDB().then(()=>{
app.listen(PORT, ()=>
{
    console.log(`Server running on port ${PORT}`);
})
});

