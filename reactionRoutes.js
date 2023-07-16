const express = require('express');
const router = express.Router();
const { Reaction } = require('./models');


router.post('/api/reactions/:thoughtId', (req, res) => {
    const { thoughtId } = req.params;
    Reaction.create(req.body)
    .then(reaction => {
    return Thought.findByIdAndUpdate(
    thoughtId,
    { $push: { reactions: reaction._id } },
    { new: true }
    );
    })
    .then(thought => res.json(thought))
    .catch(err => res.status(500).json(err));
    });
    
    
    router.delete('/api/reactions/:reactionId', (req, res) => {
    const { reactionId } = req.params;
    Reaction.findByIdAndDelete(reactionId)
    .then(reaction => {
    return Thought.findByIdAndUpdate(
    reaction.thoughtId,
    { $pull: { reactions: reactionId } },
    { new: true }
    );
    })
    .then(thought => res.json(thought))
    .catch(err => res.status(500).json(err));
    });
module.exports = router;