const router = require("express").Router();
const Conversation = require("../models/Conversation.model");


router.route("/:userId").get( async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;