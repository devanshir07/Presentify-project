const { Schema, model } = require('../connection');

const improvementSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: false }, 
    presentationId: { type: Schema.Types.ObjectId, ref: 'presentation', required: true },
    section: { type: String, required: false }, 
    suggestion: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = model('improvement', improvementSchema);
