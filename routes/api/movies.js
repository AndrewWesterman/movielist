const express = require('express');
const router = express.Router();

// @route   {GET} /api/movies
// @desc    Gets all movies
router.get('/', async (req, res) => {
    res.send('/movies');
});

// @route   {GET} /api/movies/:id
// @desc    Gets movie with :id
router.get('/:id', async (req, res) => {});

// @route   {POST} /api/movies
// @desc    Adds movie to system
router.post('/', async (req, res) => {});

// @route   {PUT} /api/movies/:id
// @desc    Updates movie with :id in system
// Might ditch in favor of upsert on post
router.put('/:id', async (req, res) => {});

module.exports = router;
