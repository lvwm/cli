const fs = require("fs");
const path = require("path");

const CONFIG_FILE = path.resolve(process.cwd(), "config.json");

module.exports = (name, options) => {
  console.log(name, options);
  let data = {};
  if (options.add) {
    const item = {
      name: options.name,
      url: options.url,
    };
    if (fs.existsSync(CONFIG_FILE)) {
      data = require(CONFIG_FILE);
      if (data.chrome.urls) {
        data.chrome.urls.push(item);
      }
    } else {
      data = {
        chrome: {
          urls: [item],
        },
      };
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
  }
};
