const Note = require("../model/noteModel");

const keySearch = async (req, res) => {
    const { keyword } = req.query;
  try {
    const notes = await Note.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in title
          { content: { $regex: keyword, $options: 'i' } } // Case-insensitive search in content
        ]
      });
  
      res.status(200).json({ notes });
  } catch (error) {
    console.log("error occur in keysearch", error);
  }
};


const filter=async(req,res)=>{
    const { tags } = req.query;

    try {
      const tagList = Array.isArray(tags) ? tags : [tags]; // Ensure tags is an array
      const notes = await Note.find({ tags: { $in: tagList } });
  
      res.status(200).json({ notes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { keySearch,filter };
