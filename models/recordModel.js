
const mongoose = require('mongoose');

// schema definition for problem document
const recordSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please add Problem name"],// true and msg
    },
    link: String,
    description: String,
    solution: {
        type: String,
    },
    tags: [String],

},
    {
        timestamps: true, // this create updatedat and createdat fields
    },
);

// const recordSchema = mongoose.Schema('Record', record);
const Record = mongoose.model('Record', recordSchema);;
module.exports = { Record };