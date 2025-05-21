const { Schema, model, Types } = require('../connection');
const feedbackSchema = new Schema({
    name: {type: String},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})
module.exports = model('feedback', feedbackSchema);