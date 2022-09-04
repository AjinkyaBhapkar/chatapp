const router = require("express").Router();
const Message = require("../models/Message.model");

router.route('/new').post(async (req, res) => {
  const newmessage = new Message(req.body)

  await newmessage.save()
    .then(() => res.status(200).json('New Message'))
    .catch((err) => res.status(500).json(err))
})


router.route("/:conversationId").get(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;