const { Thought, User } = require("../models");

const thoughtController = {
  createThought({ params, body }, res) {
    Thought.create(body).then(({ _id }) => {
      return Users.findOne(
        { _id: params.userId },
        { $push: { thought: _id } },
        { new: true }
      )
    })
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "Thought not found"});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },

  getAllThoughts(req, res) {
      Thought.find({})
      .populate({ path: "reactions", select: "-__v"})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  },

  getThoughtsById({ params }, res) {
      Thought.findOne({ _id: params.is })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(404).json({ message: "Thought not found"});
              return;
          }
          res.json(dbThoughtData);
      })
      .catch((err) => {
          console.log(err);
          res.sendStatus(400);
      });
  },

  updateThought({ params }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { 
          new: true,
          runValidators: true,
      })
      .populate({ path: "reactions", select: "-__v"})
      .select("-__v")
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(404).json({ message: "Thought not found" });
              return;         
            }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
      )
      .populate({ path: "reactions", select: "-__v"})
      .select("-__v")
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(400).json({ message: "Thought not found" });
              return;
          }
          res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteReaction({ params}, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionsId} } },
          { new: true }
      )
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(404).json({ message: "Thought not found"});
              return;
          }
          res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = thoughtController;