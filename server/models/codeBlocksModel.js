const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
    blockid: Number,
    code: String,
    solution: String,
    title: String
});


const CodeBlock = mongoose.model('CodeBlocks', codeBlockSchema);