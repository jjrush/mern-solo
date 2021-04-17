const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log(req.body);

        const userReg = new User(req.body);

        userReg.save()
        .then(() => {
            res.json({ message: "Successfully Registered", user: userReg })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },

    login: (req, res) => {
        console.log(req.body);

        User.findOne( { email: req.body.email } )
        .then((userRecord) => {
            if(userRecord === null) {
            res.status(400).json({ message: "Invalid login attempt 1"});
            } else {
            console.log(userRecord);
            bcrypt.compare(req.body.password, userRecord.password)
                .then((passwordIsValid) => {
                if(passwordIsValid) {
                    console.log("pw is valid");
                    res.cookie(
                    "usertoken",
                    jwt.sign(
                        {
                        _id: userRecord._id,
                        firstName: userRecord.firstName,
                        // whatever I want in here
                        },
                        process.env.JWT_SECRET),
                    {
                        httpOnly: true,
                        expires: new Date(Date.now() + 900000000),
                    }
                    )
                    .json({
                    message: "Successfully logged in!",
                    userLoggedIn: {
                        userName: `${userRecord.firstName} ${userRecord.lastName}`,
                    }
                    })
                } else {
                    // bad password
                    res.status(400).json({ message: "Invalid login attempt 2"});
                }
                })
                .catch(err => {
                console.log(err);
                res.status(400).json({ message: "Invalid login attempt 3"});
                })
            }
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid login attempt 4"});
        })
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.json({ message: "usertoken cookie cleared" });
    },

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        // the decoded values are held in a "payload object"
        //    we saved the _id as a part of login so we can use it for many
        //    things!
        User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    },
}