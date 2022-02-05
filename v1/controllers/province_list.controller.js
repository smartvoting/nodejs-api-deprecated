const db = require("../models");
const ProvinceList = db.province_list;

exports.findAll = (req, res) => {
  ProvinceList.findAll({
    order: ["province_name"],
  })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "Some error occured while retrieving province list.",
      });
    });
};
