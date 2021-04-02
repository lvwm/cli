const fs = require("fs");
const path = require("path");

const CONFIG_FILE = path.resolve(process.cwd(), "config.json");

function add(options) {
  let data = {};
  const item = {
    name: options.name,
    url: options.url,
  };
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      data = require(CONFIG_FILE);
    } catch {}
  }
  if (data.chrome && data.chrome.urls) {
    data.chrome.urls.push(item);
  } else {
    data = {
      chrome: {
        urls: [item],
      },
    };
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
}

module.exports = (name, options) => {
  console.log(name, options);
  if (options.add) {
    add(options);
  }
};
