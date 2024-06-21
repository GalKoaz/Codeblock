const express = require('express');

const router = express.Router();
const Block = require('../models/codeBlocksModel');


router.get("/", async (req, res) => {
    try {
        console.log("Fetching code block titles");
        const codeBlocks = await Block.find({}, "blockId title");
        const titles = codeBlocks.map((block) => ({
          id: block.blockId,
          title: block.title,
        }));
        console.log(titles);
        res.json(titles);
        console.log("Fetched code block titles");
      } catch (error) {
        console.error("Error fetching code block titles:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

// router.post("/", async (req, res) => {
//     const codeBlock = new CodeBlock({
//         title: req.body.title,
//         code: req.body.code,
//         solution: req.body.solution,
//         blockid: req.body.blockid
//     });

//     try {
//         const savedCodeBlock = await codeBlock.save();
//         res.json(savedCodeBlock);
//     } catch (error) {
//         res.json({ message: error });
//     }
// });

// router.get("/:codeBlockId", async (req, res) => {
//     try {
//         const codeBlock = await CodeBlock.findById(req.params.codeBlockId);
//         res.json(codeBlock);
//     } catch (error) {
//         res.json({ message: error });
//     }
// });

// router.delete("/:codeBlockId", async (req, res) => {
//     try {
//         const removedCodeBlock = await CodeBlock.remove({ _id: req.params.codeBlockId });
//         res.json(removedCodeBlock);
//     } catch (error) {
//         res.json({ message: error });
//     }
// });


module.exports = router;