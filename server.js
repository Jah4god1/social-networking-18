const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://jah4god1:Brooklyn1!@cluster0.e1td27t.mongodb.net/', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
})
.catch((error) => {
console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);