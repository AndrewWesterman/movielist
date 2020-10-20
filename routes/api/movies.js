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
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ msg: 'Movie with id not found' });

        return res.json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

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
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            { new: true }
        );

        if (!movie)
            return res.status(404).json({ msg: 'Movie with id not found' });

        return res.json(movie);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   {DELETE} /movies/:id
// @desc    Deletes the movie with :id
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        return res.json({ msg: 'Movie removed' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
