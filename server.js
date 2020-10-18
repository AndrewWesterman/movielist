const express = require('express');

const app = express();

app.use(express.json({ extended: false }));

// Define routes
app.use('/api/movies', require('./routes/api/movies'));

// Basic ping endpoint
// TODO: delete later
app.get('/', async (req, res) => {
    res.send(`I'm alive!`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
