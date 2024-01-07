const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema({
  config_id: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: [[String]],
    required: true,
  },
  remark: {
    type: String,
    default: "initial remark", // Default value is an empty string, you can adjust this as needed
  },
});
const configuration = mongoose.model("Configuration", configurationSchema);
module.exports = configuration;
