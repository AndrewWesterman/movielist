const express = require('express');
const router = express.Router();

const Movie = require('../../models/Movie');

// @route   {GET} /api/movies
// @desc    Gets all movies
router.get('/', async (req, res) => {
    try {
        let movies = await Movie.find({});
        console.log(movies);
        return res.json(movies);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   {GET} /api/movies/:id
// @desc    Gets movie with :id
router.get('/:id', async (req, res) => {});

// @route   {POST} /api/movies
// @desc    Adds movie to system
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie({
            ...req.body,
        });
        const movie = await newMovie.save();
        return res.json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   {PUT} /api/movies/:id
// @desc    Updates movie with :id in system
// Might ditch in favor of upsert on post
router.put('/:id', async (req, res) => {});

module.exports = router;
