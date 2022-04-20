const databased = require("../model/index");

const User = databased.users;

const jwt = require("jsonwebtoken");

let JWT_SECRET_KEY = "srp_jwt_secret_key";

let result = {};

const generateaccessToken = (res) => {
    return jwt.sign({ res: res }, JWT_SECRET_KEY, { expiresIn: "300s" });
}

const generaterefreshToken = (res) => {
    return jwt.sign({ res: res }, JWT_SECRET_KEY);
}

const clearAccessToken = () => {
    setTimeout(() => {
        result.accesstoken = "";
    }, 300000);
}

// Registration

const UserRegistration = async (req, res) => {
    try {
        let username = await User.findOne({
            where: { username: req.body.username },
        });
        if (username) {
            result.status = "Username Already Exist";
            return res.status(200).send(result);
        }
        let useremail = await User.findOne({ where: { email: req.body.email } });
        if (useremail) {
            result.status = "User Already Registered";
            return res.status(200).send(result);
        }
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            active: req.body.active,
        };
        await User.create(data);
        result.status = "User Registration Successful";
        return res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// login

const Userlogin = async (req, res) => {
    try {
        let user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            result.status = "User is not Registered";
            return res.status(200).send(result);
        }
        else if (user.password !== req.body.password &&
            user.username === req.body.username) {
            result.status = "Invalid Credentials";
            return res.status(200).send(result);
        } else if (
            user.password === req.body.password &&
            user.username === req.body.username
        ) {
            result.status = "User Login Successful";
            const accesstoken = generateaccessToken(user);
            const refreshToken = generaterefreshToken(user);
            result.accesstoken = accesstoken;
            result.refreshToken = refreshToken;
            clearAccessToken();
            return res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Authorised APIs
// getallusers

const getallusers = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ');
        if (token[1] === result.accesstoken) {
            let users = await User.findAll({});
            return res.status(201).send(users);
        } else if (token[1] !== result.accesstoken) {
            result.status = "Invalid Token";
            return res.status(403).send({ status: result.status });
        }
    } catch (err) {
        return res.status(500).json({ status: "UnAuthorised Access" });
    }
};

module.exports = { UserRegistration, Userlogin, getallusers };
