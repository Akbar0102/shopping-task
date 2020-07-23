const express = require('express');
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const adminRoute = require('./routes/admin');

app.use('/api', adminRoute);

// run server
app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});