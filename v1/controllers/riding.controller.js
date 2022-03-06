const db = require("../models");
const RidingList = db.riding_list;
const axios = require("axios");
const opennorth = require("represent");
const mapquest = require("@mapquest/geocoding");
const geocode = new mapquest({ key: process.env.MAPQUEST_KEY });
const apiErrorMsg = "Open North API Call Failure";
const postcodeFormat = /[a-zA-Z][0-9]+[a-zA-Z][0-9]+[a-zA-Z][0-9]+/i;

const getRidingById = (riding_id) => {
  RidingList.findByPk(riding_id).then((data) => {
    return data;
  });
};

exports.locate = async (req, res) => {
  let id = req.params.id;
  let riding_id = -1;
  let latlng;

  if (postcodeFormat.test(id)) {
    console.log("poop - 1");
    await geocode.forward(id).then((result) => {
      latlng = result.properties.latLng;
      console.log("poop - 2");
    });

    let callURL = `https://represent.opennorth.ca/boundaries/?contains=${latlng.lat},${latlng.lng}`;

    await axios.get(callURL).then((response) => {
      console.log(response);
    });

    // opennorth.boundariesLatLon(latlng.lat, latlng.lng, (error, data) => {
    //   console.log("poop - 3");
    //   riding_id = data.objects[1].external_id;
    //   console.log(riding_id);
    // });
  } else {
    riding_id = id;
  }

  console.log("poop - 3b");
  if (riding_id != -1) {
    console.log("poop - 4");
    await RidingList.findByPk(riding_id).then((data) => {
      res.status(200).send(data);
    });
  }
  console.log("poop - 5");
};

// exports.district = (req, res) => {
//   let id = req.params.id;
//   let url = apiURL("representatives", id);
//   axios
//     .get(url)
//     .then((response) => {
//       if (response.status == 200) {
//         res.status(200).send(response.data);
//       } else {
//         res.status(response.status).json({
//           message: response.statusText || apiErrorMsg,
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: error.message || apiErrorMsg,
//       });
//     });
// };
