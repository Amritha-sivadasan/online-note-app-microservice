const mongoose=require('mongoose')


const noteShema=mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true,
        trim: true
      },
      tags: {
        type: [String],
        default: []
      }

},{timestamps:true})

const note=mongoose.model('Note',noteShema)
module.exports=note