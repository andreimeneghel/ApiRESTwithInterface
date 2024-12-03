const mongoose = require('mongoose');

const teachersSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    school_disciplines: { type: String, required: true },
    contact: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true }
});


module.exports = mongoose.model('Teachers', teachersSchema);
