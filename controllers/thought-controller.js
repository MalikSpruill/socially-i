const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log('Error from getAllThoughts',err);
            res.status(400).json(err);
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log('Error from getThoughtById', err);
            res.status(400).json(err);
        })
    },
    addThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log('Error from addThought', err);
            res.status(400).json(err);
        })
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(thoughtData);
            }
        )
        .catch(err => {
            console.log('Error from updateThought', err);
            res.status(400).json(err);
        })
    },
    removeThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            return User.findOneAndUpdate(
                {_id: params.userId },
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log('Error from removeThought', err);
            res.status(400).json(err);
        })
    },
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log('Error from addReaction', err);
            res.status(400).json(err);
        })
        
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log('Error from removeReaction', err);
            res.status(400).json(err);
        })
    }
};

module.exports = thoughtController;

