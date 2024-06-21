const express = require('express');

const router = express.Router();
const codeblocks = require('../models/codeBlocksModel');


router.get("/", async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find();
        res.json(codeBlocks);
    } catch (error) {
        res.json({ message: error });
    }
    });

router.post("/", async (req, res) => {
    const codeBlock = new CodeBlock({
        title: req.body.title,
        code: req.body.code,
        solution: req.body.solution,
        blockid: req.body.blockid
    });

    try {
        const savedCodeBlock = await codeBlock.save();
        res.json(savedCodeBlock);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/:codeBlockId", async (req, res) => {
    try {
        const codeBlock = await CodeBlock.findById(req.params.codeBlockId);
        res.json(codeBlock);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete("/:codeBlockId", async (req, res) => {
    try {
        const removedCodeBlock = await CodeBlock.remove({ _id: req.params.codeBlockId });
        res.json(removedCodeBlock);
    } catch (error) {
        res.json({ message: error });
    }
});


module.exports = router;