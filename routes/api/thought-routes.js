const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:thoughtId')
    .get(getThoughtById);

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;