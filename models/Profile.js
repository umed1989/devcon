const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUsername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            description: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            description: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        linkedIn: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    unique: true
})

profileSchema.pre(/^find/, function(next) {
    this.populate('user')
    next()
})

module.exports = mongoose.model('Profile', profileSchema)