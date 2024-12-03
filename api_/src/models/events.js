const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Events', eventsSchema);
