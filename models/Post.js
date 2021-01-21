
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Post suppose to have an owner!'],
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
                uppercase: true
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        } 
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

// postSchema.pre('save', function(next) => {
//     this.comments.map(el => el.avatar)
// })

module.exports = mongoose.model('Post', postSchema)