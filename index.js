const express = require('express');
const cors = require('cors')

const apiRoutes = require('./route');
require('./db')

const app = express();
const PORT = 8000;


app.use(cors())


// Middleware
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
