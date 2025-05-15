const {Schema, model} = require('../connection');

const pptSchema = new Schema({
    title: {type: String, required: true},
    fileName: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = model('PPTdata', pptSchema);