const router = require("express").Router();
const Conversation = require("../models/Conversation.model");

router.route('/new').post(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderID, req.body.receiverID]
  })

  await newConversation.save()
    .then(() => res.status(200).json('New conversation created'))
    .catch((err) => res.status(500).json(err))

})

router.route("/:userId").get(async (req, res) => {
  await Conversation.find({ members: req.params.userId })
    .then((conversation) => res.status(200).json(conversation))
    .catch(err => res.status(500).json(err))

});


module.exports = router;