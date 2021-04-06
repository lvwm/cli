const path = require("path");
const fs = require("fs");

const config_file = path.resolve(process.cwd(), "config.json");
class Options {
  constructor(file) {
    this.file = file;
  }

  load() {
    let config = {};
    if (fs.existsSync(this.file)) {
      try {
        config = require(this.file);
        return config;
      } catch {
        return "";
      }
    } else {
      console.log("error: local config file not found");
      return "";
    }
  }

  save(data) {
    fs.writeFileSync(config_file, JSON.stringify(data, null, 2));
  }
}

module.exports = new Options(config_file);
