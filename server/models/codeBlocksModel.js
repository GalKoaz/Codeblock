const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
    blockid: {type: Number, required: true},
    title: {type: String, required: true},
    code: {type: String, required: true},
    solution: {type: String, required: true}
});


const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);