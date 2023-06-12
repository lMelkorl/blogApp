const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    comments: [
        {
            username: {
                type: String,
                required: false
            },
            content: {
                type: String,
                required: false
            },
            profilePic: {
                type: String,
                default: "default.png"
            }
        }
    ],
    views:{
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);