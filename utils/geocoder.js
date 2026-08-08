const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  language: "en",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
