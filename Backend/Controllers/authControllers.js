
const bcrypt = require('bcrypt');
const Users = require('../Model/UserSchema');


const jwt = require('jsonwebtoken');

require('dotenv').config()

const signup = async (req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password)
            return res.status(404).json({message : "All fields need to be filled"})
        
        const exsistUser = await Users.findOne({email})
        if(exsistUser)
            return res.status(409).json({message :" user is already exsisting "})

        const passwordHash = await bcrypt.hash(password,10);

        const user = await Users.create({
            email,
            password : passwordHash
        })

        res.status(201).json({
            message : " Added To the Users",
            userId : user._id 
        })
    }

    catch (error) {
        console.log("The User Failed To insert into Users",error);
        res.status(500).json({message : "User Failed to Add to db"})
    }
}

const login = async (req,res) =>{

    try {
        const {email,password} = req.body;

        const user  = await  Users.findOne({email});
        if(!user)
            return res.status(401).json({message : "Failed to login"});
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message : "Incorrect crentials"});
        }

        const token = jwt.sign(
            {
                userId : user._id,
                email : user.email
            },
            process.env.JWT_SECRET,
            { expiresIn : "1h"}

        );

        res.status(200).json(
        {
            message : "Login successful",
            token
        })
        
    }
    
    catch (error){
        console.log('login failed',error)
        res.status(500).json({message : "Failed to login"});
    }

}

const logout = (req,res) =>{
    // It will handled on the Client side (frontend)
      return res.status(200).json({
        message: "Logged out successfully"
    });
}

const home = async (req,res)=>{

    try{
        const userId = req.user.userId

        const user = await Users.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        //Gives the User Profile as response
        res.status(200).json({message : "Sucessfully got the User Details",email : user.email , userid : user._id});
    }
    catch (error) {
    console.error("Failed to get user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports ={ signup,login,logout,home}
