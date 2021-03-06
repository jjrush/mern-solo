const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../models/user.model');
const userRoutes = require('../routes/user.routes');

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

    update: (req, res) => {
        // console.log("update called:)")
        // console.log(req.params.id);
        // console.log(req.body);
        const id = req.params.id;
        // console.log(id);
        const order = req.body;
        
        // db.collection("users").updateOne(
        //     { _id: id },
        //     { $push: { "orders": {order}}},
        //     { upsert: true} 
        // )
        // console.log(db.collection('users').find({_id: id}))
        // console.log(order);
        User.findByIdAndUpdate(id, order, {
            new: true,
            runValidators: true, 
        })
        .then((item) => {
            // console.log('good2go')
            // console.log(res.json(item.body))
            res.json(item);
        })
        .catch((err) => {
            console.log("error found in update");
            console.log(err);
            res.json(err);
        });
        
    },


    favorite: (req, res) => {
        // console.log("favorite called:)")
        const id = req.params.id;
        const favorite = req.body;

        User.findByIdAndUpdate(id, {}, {
            new: true,
            runValidators: true, 
        })
        .then(
            User.findByIdAndUpdate(id, favorite, {
                new: true,
                runValidators: true, 
            })
            .then((item) => {
                // console.log('good2gofav')
                // console.log(res.json(item.body))
                res.json(item);
            })
            .catch((err) => {
                console.log("error found in favorite");
                console.log(err);
                res.json(err);
            })
        );
    },

    // create: (req, res) => {
    //     // console.log(req.body);

    //     User.create( req.body )
    //     .then((doc) => {
    //         // console.log(newKaraokeSong);
    //         res.json(doc);
    //     })
    //     .catch((err) => {
    //         console.log("error found in create");
    //         console.log(err);
    //         res.json(err);
    //     });
    // },

    login: (req, res) => {
        // console.log(req.body);

        User.findOne( { email: req.body.email } )
        .then((userRecord) => {
            if(userRecord === null) {
            res.status(400).json({ message: "Invalid login attempt 1"});
            } else {
            // console.log(userRecord);
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
                        /*process.env.JWT_SECRET*/"secret"),
                    {
                        httpOnly: true,
                        expires: new Date(Date.now() + 900000000),
                    }
                    )
                    .json({
                    message: "Successfully logged in!",
                    userLoggedIn: {
                        userName: `${userRecord.firstName} ${userRecord.lastName}`,
                    },
                    id: userRecord._id
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
        console.log("herrrrr: " +decodedJWT.payload._id)
        User.findById(decodedJWT.payload._id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    getOne: (req, res) => {
        // console.log("id: " + req.params.id);

        User.findById( req.params.id )
        .then((document) => {
            // console.log(oneKaraokeSong);
            res.json(document);
        })
        .catch((err) => {
            console.log("error found in getOne");
            console.log(err);
            res.json(err);
        });
    },

}