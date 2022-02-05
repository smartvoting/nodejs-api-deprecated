const db = require("../models");
const ApiKeys = db.api_keys;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: "API Key Name Required",
    });
    return;
  }

  const _apiKey = {
    name: req.body.name,
    status: req.body.status || false,
  };

  ApiKeys.create(_apiKey)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "An error occured while creating a new api key.",
      });
    });
};

exports.findAll = (req, res) => {
  ApiKeys.findAll({
    order: ["name"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || "An error occured while retrieving api keys.",
      });
    });
};

exports.findOne = (req, res) => {
  const _id = req.params.id;
  ApiKeys.findByPk(_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while retrieving api key with id: " + id,
      });
    });
};

exports.update = (req, res) => {
  const _id = req.params.id;
  const _name = req.body.name;
  const _status = req.body.status;

  ApiKeys.update(
    {
      name: _name,
      status: _status,
    },
    {
      where: { key: _id },
    }
  )
    .then((data) => {
      if (data == 1) {
        res.status(200).send("API Key Updated.");
      }
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while updating api key with id: " + id,
      });
    });
};

exports.delete = (req, res) => {
  const _id = req.params.id;
  ApiKeys.destroy({
    where: { key: _id },
  })
    .then((data) => {
      if (data == 1) {
        res.status(200).send("API Key Deleted.");
      }
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while deleting api key with id: " + id,
      });
    });
};
