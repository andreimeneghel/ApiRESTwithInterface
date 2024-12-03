const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const appointmentSchema = new mongoose.Schema({
    id: { type: String, required: true },  
    specialty: { type: String, required: true },
    comments: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: String, required: true },
    professional: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
