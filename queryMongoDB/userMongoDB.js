const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const userDB = require('../service/user');
const valid = require('../service/validation/userValid');
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const gravatar = require('gravatar');
const { v4:uuidv4} = require('uuid');
const {sendEmail} = require('../service/sendEmail/sendEmail');

const avatarStore = path.join(__dirname, "../public", "avatars");

const register = async (req, res, next) => {
    const {email, password } = req.body;
    try {
        const user = await userDB.findUser({email});
        const error = await valid.userValid.validate(req.body);
        if (user) {
            res.status(409).json( { message:`Email ${email} already exists.`})
        } else if (!error) {
            res.status(400).json({message:error})
        } else {
            const verificationToken = uuidv4();
            const avatarURL = gravatar.url(email);
            const userHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
        await userDB.createUser({
            email,
            password:userHash,
            avatarURL,
            verificationToken,
            });
            const msg = `Here's a token to verify your email address: http://localhost:3000/api/users/verify/${verificationToken}`;
            await sendEmail(email, "registration", msg);

        res.status(201).json(
            {user:
                {
                email,
                subscription: 'starter',
                }
            });
        }        
    } catch (e) {
        next(e);
    }
};




const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userDB.findUser({email});
    const passVerification = bcrypt.compareSync(password, (user && user.password) || '');
    
    if (!user || !passVerification){
        res.status(401).json({message:"Email or password is wrong"})
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
    await userDB.findAndUpdateUser(user._id, {token});

    res.status(200).json({
        data: {
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
        },
    })
};


const logout = async (req, res) => {
    const {_id} = req.user;
        await userDB.findAndUpdateUser(_id, {token: null});
        return res.status(204).json({message: "No Content"});
};


const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
};

const pathUser = async (req, res, next) =>{
    try {
        const { error } = valid.subscriptionUser.validate(req.body);
        if (error) {
            res.status(401).json({message:"Subscription has not been specified"})
        }
        const { _id } = req.user;
        const { subscription } = req.body;
        const updatrContact = await userDB.findAndUpdateUser(
          _id,
          { subscription },
          {
            new: true,
          }
        );
        res.status(200).json(updatrContact);
      } catch (e) {
        next(e);
      }
}; 

const pathUserAvatar = async (req, res, next) => {
    if (!req.file){
        return res.status(400).json({ message: "There is no file" });
    }          
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarStore, newName);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join("avatars", newName);
    await userDB.findAndUpdateUser(_id, { avatarURL });
    res.json({
      avatarURL,
    });

};


const verificationToken = async (req, res, next)=>{
    const verificationToken = req.params.verificationToken;
    const user = await userDB.findUser({verificationToken});
    if (!user) {
        res.status(404).json({message: 'User not found'});
    };

    await userDB.findAndUpdate( {verificationToken} , { $set: { verify: true } });
    req.params.verificationToken = null;

    return res.status(200).json({ message: 'Verification successful'} );
}; 



const repeatverificationToken = async (req, res, next)=>{
    const { email } = req.body;
    const user = await userDB.findUser({email});
    if (!email) {
        res.status(400).json({message: "missing required field email"});
    }
    if (!user) {
        res.status(404).json({message: 'User not found'});
    };
    if (user.verify) {
        res.status(400).json({message: "Verification has already been passed"});
    }

    const msg = `Here's a token to verify your email address: http://localhost:3000/api/users/verify/${user.verificationToken}`;
    await sendEmail(email, "registration", msg);

    res.status(200).json({message: `Verification email sent`});
};






module.exports = {
    register,
    login,
    logout,
    current,
    pathUser,
    pathUserAvatar,
    verificationToken,
    repeatverificationToken,
};