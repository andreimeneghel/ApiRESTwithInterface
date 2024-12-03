const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const studentsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    parents: { type: String, required: true },
    phone: { type: String, required: true },
    special: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Students', studentsSchema);
