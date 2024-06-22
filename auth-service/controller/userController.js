const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({ msg: "User already exist" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log("error in register userr", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json("user is not found");
    }
    if (password !== userData.password) {
      return res.json("pasword not match");
    }
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'development', 
        maxAge: 5 * 60 * 60 * 1000, 
    });
    return res.json({ message: 'Login successful' });
  } catch (error) {
    console.log("error occur in login ", error);
  }
};

const userDetails=async(req,res)=>{
  const {userId}=req.query
  try {
    const user= await User.findOne({_id:userId})
    res.json(user)
    
  } catch (error) {
    console.log('error while getting user details',error);
    
  }
}

module.exports = { register, login,userDetails };
