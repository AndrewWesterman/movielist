const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.use('/api/movies', require('./routes/api/movies'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static build folder
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
