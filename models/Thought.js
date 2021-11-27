const { Schema, Model, Datatypes } = require('mongoose');

const mongoose = require('../config/connection');

class Thoughts extends Model {}

Thoughts.init(
    {
        thoughtText: {
            type: DataTypes.STRING,


        }
    }
)