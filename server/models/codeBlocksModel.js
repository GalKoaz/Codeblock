const mongoose = require('mongoose');

/*
  codeBlocksModel.js description:
  This file contains the schema definition for the code block model.
  It defines the structure of the code block document in the MongoDB database.
*/

const codeBlockSchema = new mongoose.Schema({
    title: String,
    code: String,
    solution: String,
    blockId: Number
});

const Block = mongoose.model('Block', codeBlockSchema);

module.exports = Block;