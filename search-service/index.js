const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const {connectRabbitMQ}=require('./rabbitmq/rabbitmqConnections')
const {consumer}=require('./rabbitmq/consumer')
const {keySearch,filter}=require('./controller/searchcontroller')
dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())
app.get('/search',keySearch)
app.get('/filter',filter)

 connectRabbitMQ().then(()=>{
    consumer()
 })
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('mongoose is connectd successfully');
}).catch((err)=>{
    console.log('database connection error',err);
})
app.listen(5003,()=>{
    console.log('server is running on the port 5002');
})