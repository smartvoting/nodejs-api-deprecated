const axios = require("axios");

const apiURL = (type, id) => `https://represent.opennorth.ca/${type}/${id}`;
const apiErrorMsg = "Open North API Call Failure";

exports.postcode = (req, res) => {
  let id = req.params.id;
  let url = apiURL("postcodes", id);
  axios
    .get(url)
    .then((response) => {
      if (response.status == 200) {
        res.status(200).send(response.data);
      } else {
        res.status(response.status).json({
          msg: response.statusText || apiErrorMsg,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: error.message || apiErrorMsg,
      });
    });
};

exports.district = (req, res) => {
  let id = req.params.id;
  let url = apiURL("representatives", id);
  axios
    .get(url)
    .then((response) => {
      if (response.status == 200) {
        res.status(200).send(response.data);
      } else {
        res.status(response.status).json({
          msg: response.statusText || apiErrorMsg,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: error.message || apiErrorMsg,
      });
    });
};
