const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    datetime: { type: Date, required: true },
    payload: { type: String, required: true },
    results: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = { Search };