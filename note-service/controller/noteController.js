const Note=require('../model/noteModel')
const {PublisherNote}=require('../rabbitmq/publisher')

const addNotes=async(req,res)=>{
    const {title,userId,content,tags}=req.body
    try {
        const titleExist = await Note.findOne({title})
        if(titleExist){
            return res.json("title already exit")
        }  
        const newNote= new Note({title,userId,content,tags})
            newNote.save()
            PublisherNote('Note_Creted',{noteId:newNote._id,title,content,tags,userId})
            res.json('note saved')
        
    } catch (error) {
        console.log('error while adding new note',error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const allNotes=async(req,res)=>{
   try {
       const notes=await Note.find()
       res.json(notes)
    
   } catch (error) {
    console.log('error occur in allnotes');
    res.status(500).json({ error: 'Internal server error' });
   }

}

const Mynotes=async(req,res)=>{
    const{userId}=req.query
    try {
       const userNotes=await Note.find({userId})
       res.status(200).json(userNotes)
        
    } catch (error) {
        console.log('error occur in mynotes');
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports={addNotes,allNotes,Mynotes}
