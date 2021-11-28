const Schema = require ('mongoose')

const ReactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Must be less than 280 characters'],
    },
    userName: {
        string: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        toJSON: {
            getters: true
        },
    },
})

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;