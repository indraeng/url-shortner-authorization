const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [{
        timeStamps: {
            type: String
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
}, { timestamps: true })

const Url = mongoose.model('url', urlSchema)

module.exports = Url;