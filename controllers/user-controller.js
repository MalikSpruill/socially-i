const { User } = require('../models');

const userController = {
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log('Error from getAllUsers', err);
            res.status(400).json(err);
        })
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from getUserById', err);
            res.status(400).json(err);
        })
    },
    createUser({body}, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => {
            console.log('Error from createUser', err);
            res.status(400).json(err);
        })
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from updateUser', err);
            res.status(400).json(err);
        }) 
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from deleteUser', err);
            res.status(400).json(err);
        }) 
    },
    addFriend({params}, res) {
        User.findONeAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from addFriend', err);
            res.status(400).json(err);
        }) 
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate({_id: params.userId})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from deleteFriend', err);
            res.status(400).json(err);
        }) 
    }
};

module.exports = userController;