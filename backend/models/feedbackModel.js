const {Schema, model} = require('../connection');
const feedbackSchema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})
module.exports = model('contact', feedbackSchema);