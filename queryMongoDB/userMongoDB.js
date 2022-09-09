const bcrypt = require('bcrypt');
const userDB = require('../service/user');
const valid = require('../service/validation/userValid');
const jwt = require('jsonwebtoken');


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
            const userHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
        await userDB.createUser({email, password:userHash});
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


module.exports = {
    register,
    login,
    logout,
    current,
};