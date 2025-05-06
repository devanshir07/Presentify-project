const {Schema, model} = require('../connection');
const feedbackSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required:true},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})
module.exports = model('feedback', feedbackSchema);