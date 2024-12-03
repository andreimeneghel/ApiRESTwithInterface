const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const professionalsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    contact: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Professionals', professionalsSchema);
