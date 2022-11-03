const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        //check if the user exist before
        const checkUser = await UserModel.findOne({ email: req.body.email })
        if (checkUser) {
            return res.status(400).send('User Already Exist');
        }
        user = new UserModel();
        console.log(user)
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.password = req.body.password

        await user.save()

        delete user.password

        res.status(200).json({
            message: 'Signup successful',
            user: user
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}

exports.login = (req, res, { err, user, info }) => {

    if (!user) {
        return res.json({ message: 'Email or password is incorrect first' })
    }   

    // req.login is provided by passport
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, email: user.email };
            //You store the id and email in the payload of the JWT.
            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
            // DO NOT STORE PASSWORDS IN THE JWT!
            const tokenValidity = '1h'
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'secret_token', { expiresIn: tokenValidity });

            return res.status(200).json({ token, email: user.email, first_name: user.first_name });
        }
    );
}