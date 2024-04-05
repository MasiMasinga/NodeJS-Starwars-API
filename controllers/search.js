const { Search } = require('../models/search');
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const search = async (req, res) => {
    const { search } = req.query;

    const cachedResult = await Search.findOne({ payload: search });

    if (cachedResult && Date.now() - cachedResult.datetime < process.env.CACHE_TIME * 60 * 1000) {
        return res.send(cachedResult.results);
    }

    const response = await axios.get(`https://swapi.dev/api/people/?search=${search}`);

    const results = response.data.results;

    if (cachedResult) {
        cachedResult.results = results;
        cachedResult.datetime = Date.now();
        await cachedResult.save();
    } else {
        await Search.create({ payload: search, results, datetime: Date.now() });
    }

    return res.status(200).json({ message: 'Success', results: results })
}

module.exports = { search };