const { User } = require('../models');

const userController = {

    createUser: ({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
       });
},

getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({ path: 'thoughts', select: '-__v'})
    .populate({ path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "User not found"});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

updateUser({ params }, res) {
    User.findOneAndUpdate({ _id: params.id })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "User not found"})
            return;
        }
        res.json(dbUserData)
    })
}
}