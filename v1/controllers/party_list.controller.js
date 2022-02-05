const db = require("../models");
const PartyList = db.PartyList;

exports.findAll = (req, res) => {
  PartyList.findAll({
    order: ["party_name"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "An error occured while retrieving the party list.",
      });
    });
};

exports.findOne = (req, res) => {
  const _id = req.params.id;
  PartyList.findByPk(_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while retrieving the party with id number " + _id,
      });
    });
};
