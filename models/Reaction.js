const { Schema } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Must be less than 280 characters'],
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },

})


module.exports = ReactionSchema;