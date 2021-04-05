const path = require("path");
const fs = require("fs");

module.exports = () => {
  const config_file = path.resolve(process.cwd(), "config.json");
  let config = {};
  if (fs.existsSync(config_file)) {
    try {
      config = require(config_file);
      return config;
    } catch {
      return "";
    }
  } else {
    console.log("error: local config file not found");
    return "";
  }
};
