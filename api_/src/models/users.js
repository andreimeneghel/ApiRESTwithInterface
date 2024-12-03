const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    level: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Users', usersSchema);
