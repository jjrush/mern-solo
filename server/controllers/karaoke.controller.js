const Karaoke = require('../models/karaoke.model');

module.exports = {
    getAll: (req, res) => {
        Karaoke.find({})
        .sort({ title: "ascending" })
        .then((allKaraokeSongs) => {
            // console.log(allKaraokeSongs);
            res.json(allKaraokeSongs);
        })
        .catch((err) => {
            console.log("error found in getAll");
            console.log(err);
            res.json(err);
        });
    },

    create: (req, res) => {
        // console.log(req.body);

        Karaoke.create( req.body )
        .then((newKaraokeSong) => {
            // console.log(newKaraokeSong);
            res.json(newKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in create");
            console.log(err);
            res.json(err);
        });
    },

    getOne: (req, res) => {
        console.log(req.params.id);

        Karaoke.findById( req.params.id )
        .then((oneKaraokeSong) => {
            // console.log(oneKaraokeSong);
            res.json(oneKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in getOne");
            console.log(err);
            res.json(err);
        });
    },

    update: (req, res) => {
        // console.log(req.params.id);
        // console.log(req.body);

        Karaoke.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        })
        .then((updatedKaraokeSong) => {
            // console.log(updatedKaraokeSong);
            res.json(updatedKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in update");
            console.log(err);
            res.json(err);
        });
    },

    delete: (req, res) => {
        // console.log(req.params.id);

        Karaoke.findByIdAndDelete( req.params.id )
        .then((deletedKaraokeSong) => {
            // console.log(deletedKaraokeSong);
            res.json(deletedKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in delete");
            console.log(err);
            res.json(err);
        });
    },
}