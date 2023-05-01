const express=require('express');
const app=express()
const ErrorMiddleware=require('./Middlewares/Error')

const EventRouter=require('./Routes/EventRouter')
app.use(express.json())
app.use('/api/v3/app/events',EventRouter)
app.get('/',(req,res)=>{
    res.send('Events API is working')
})
app.use(ErrorMiddleware)
module.exports=app
