import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken'
import User from "../Modules/userModell.js";
import Admin from "../Modules/adminModel.js";


// user registration 
export const registerUser = async (req, res)=>{

    try{
        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser =new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phoneNumber: req.body.phoneNumber
        })

        await newUser.save();
        res.status(200).send("User has been Created");

    }catch(error){
        res.status(400).json({ error: error.message });   
    }
}





// regiser Admin 
export const registerAdmin = async (req, res, next)=>{

    try{
        const {username,
               email,
               role,
               password}= req.body


        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newAdmin =new Admin({
            username,
            email,
            password: hash,
            role
            
        })

        await newAdmin.save();
        res.status(200).send("Admin has been Created");

    }catch(error){
        res.status(400).json({ error: error.message });  
    }
}




// create login function 

export const login = async(req, res) =>{
    try{
        const admin =await Admin.findOne({username:req.body.username})
        if(!admin) return next(createError(404, "Admin not found"))
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "Admin not found"))


        const isPasswordCorrect =await bcrypt.compare(req.body.password, admin.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong Password or Username!"))

        const token= jwt.sign({id:admin.id, isAdmin:admin.isAdmin}, process.env.JWT)

        const {password , isAdmin, ...otherDetails}=admin.doc;

        res.cookie("access_token", token,{
            httpOnly:true
        }).status(200).json({...otherDetails})
    }catch(error){
        res.status(400).json({ error: error.message });  
    }

}