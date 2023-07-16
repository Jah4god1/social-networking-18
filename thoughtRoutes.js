const express = require('express');
const router = express.Router();
const { Thought } = require('./models');

router.get('/', (req, res) => {
Thought.find()
.populate('reactions')
.then(thoughts => res.json(thoughts))
.catch(err => res.status(500).json(err));
});

router.get('/:thoughtId', (req, res) => {
Thought.findById(req.params.thoughtId)
.populate('reactions')
.then(thought => res.json(thought))
.catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
Thought.create(req.body)
.then(thought => res.json(thought))
.catch(err => res.status(500).json(err));
});

router.put('/:thoughtId', (req, res) => {
Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
.then(thought => res.json(thought))
.catch(err => res.status(500).json(err));
});

router.delete('/:thoughtId', (req, res) => {
Thought.findByIdAndDelete(req.params.thoughtId)
.then(thought => res.json(thought))
.catch(err => res.status(500).json(err));
});

module.exports = router;