const {Schema, model} = require('../connection');
const pptSchema = new Schema({
    title: {type: String, required: true},
    password: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
})
module.exports = model('PPTdata', pptSchema);