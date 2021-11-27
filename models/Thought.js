const { Schema, Model, } = require('mongoose');

const ThoughtSchemata = new Schema({
    thoughtText: {
        type: 'string',
        required: true,
        min: [1, 'Must have at least one character'],
        max: [280, 'Must be less than 280 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        toJSON: {
            getters: true
          }
    },
    userName: {
        type: 'string',
        required: true,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: ReactionSchema

    }]
});
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;