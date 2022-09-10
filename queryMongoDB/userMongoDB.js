const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const userDB = require('../service/user');
const valid = require('../service/validation/userValid');
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const gravatar = require('gravatar');

const avatarStore = path.join(__dirname, "../public", "avatars");

const register = async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await userDB.findUser({email});
        const error = await valid.userValid.validate(req.body);
        if (user) {
            res.status(409).json( { message:`Email ${email} already exists.`})
        } else if (!error) {
            res.status(400).json({message:error})
        } else {
            const avatarURL = gravatar.url(email);
            const userHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
        await userDB.createUser({email, password:userHash,avatarURL,});
        res.status(201).json(
            {user:
                {
                email,
                subscription: 'starter',
                }
            });
        }        
    } catch (e) {
        next();
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
    console.log(tempPath);
    console.log(originalname);
    const [extension] = originalname.split(".").reverse();
    console.log(extension);
    const newName = `${_id}.${extension}`;
    console.log(newName);
    const uploadPath = path.join(avatarStore, newName);
    console.log(uploadPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join("avatars", newName);
    await userDB.findAndUpdateUser(_id, { avatarURL });
    res.json({
      avatarURL,
    });

};


module.exports = {
    register,
    login,
    logout,
    current,
    pathUser,
    pathUserAvatar,
};