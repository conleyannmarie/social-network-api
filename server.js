const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencode({ extended: true }));

const { User } = require('./models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api');

// Use this to log mongo queries being executed!
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));