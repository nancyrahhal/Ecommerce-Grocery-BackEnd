import bcryptjs from 'bcryptjs';
import jwt from  'jsonwebtoken'
import User from "../Modules/userModell.js";
import Admin from "../Modules/adminModel.js";


// user registration 


export const registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
            phoneNumber,
        });

        await newUser.save();

        res.status(200).send('User has been created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






// regiser Admin 
export const registerAdmin = async (req, res, next)=>{

    try{
        const {username,
               email,
               password,
               role
               }= req.body


        const salt =bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

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




export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password);

            if (validPassword) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                const { password: hashedPassword, ...rest } = user.toJSON();
                const expiryDate = new Date(Date.now() + 3600000);

                res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });

                return res.status(200).json(rest);
            }
        }

        const admin = await Admin.findOne({ where: { email } });

        if (admin) {
            const validPassword = await bcryptjs.compare(password, admin.password);

            if (validPassword) {
                const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
                const { password: hashedPassword, ...rest } = admin.toJSON();
                const expiryDate = new Date(Date.now() + 3600000);

                res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });

                return res.status(200).json(rest);
            }
        }

        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



//register with google


export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user.doc;
        const expiryDate = new Date(Date.now() + 3600000); 
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  