const path = require("path");
const fs = require("fs");

const config_file = path.resolve(process.cwd(), "config.json");
class Options {
  constructor(file) {
    this.file = file;
    this.config = {};
  }

  get urls() {
    return this.config.chrome && this.config.chrome.urls
      ? this.config.chrome.urls
      : "";
  }

  set urls(value) {
    if (!this.config.chrome) {
      this.config.chrome = {};
    }
    this.config.chrome.urls = value;
    this.save(this.config);
  }

  load() {
    if (fs.existsSync(this.file)) {
      try {
        this.config = require(this.file);
        return this.config;
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
