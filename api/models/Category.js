const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 55,
        unique: true,
    },

}, { timestamps: true });



module.exports = mongoose.model("Category", CategorySchema);