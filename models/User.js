const { Schema, Model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'

    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const User = model('User', UserSchema);

module.exports = User;