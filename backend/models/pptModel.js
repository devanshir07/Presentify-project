const {Schema, model} = require('../connection');
const pptSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    fileName: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    topic: {type: String, required: true},
    numberOfSlides: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = model('PPTdata', pptSchema);