const express = require('express');
const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'))

const { User } = require('./models');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongoose', {

    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true)


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));