const { Schema, model, } = require('mongoose');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: 'string',
        required: true,
        min: [1, 'Must have at least one character'],
        max: [280, 'Must be less than 280 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userName: {
        type: 'string',
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ReactionSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;