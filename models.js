const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
reactionBody: { type: String, required: true, maxlength: 280 },
username: { type: String, required: true },
createdAt: { type: Date, default: Date.now, get: timestamp => formatDate(timestamp) }
});

const userSchema = new Schema({
username: { type: String, unique: true, required: true, trim: true },
email: { type: String, unique: true, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('friendCount').get(function () {
return this.friends.length;
});

const thoughtSchema = new Schema({
thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
createdAt: { type: Date, default: Date.now, get: timestamp => formatDate(timestamp) },
username: { type: String, required: true },
reactions: [reactionSchema]
});

const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { User, Thought, reactionSchema };