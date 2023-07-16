const express = require('express');
const router = express.Router();
const { User } = require('./models');

router.get('/api/users', (req, res) => {
    User.find()
    .populate('thoughts')
    .populate('friends')
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
    });
    
    router.get('/api/users/:userId', (req, res) => {
    User.findById(req.params.userId)
    .populate('thoughts')
    .populate('friends')
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
    });
    
    
    router.post('/api/users', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
    });
    
    router.put('/api/users/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
    });
    
    
    router.delete('/api/users/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
    });

    module.exports = router;


