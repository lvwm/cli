const execa = require("execa");
const fs = require("fs");
const path = require("path");

const CONFIG_FILE = path.resolve(process.cwd(), "config.json");
let urls = "";
const CMD_OPEN = `open -na "Google Chrome" --args ${urls}`;

function add(options) {
  let config = {};
  const item = {
    name: options.name,
    url: options.url,
  };
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      config = require(CONFIG_FILE);
    } catch {}
  }
  if (config.chrome && config.chrome.urls) {
    config.chrome.urls.push(item);
  } else {
    config = {
      chrome: {
        urls: [item],
      },
    };
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

module.exports = (name, options) => {
  console.log(name, options);
  if (name && name.length > 0) {
    urls = name;
    execa("open", ["-na", "Google Chrome", "--args"].concat(urls)).stdout.pipe(process.stdout);
  }
  if (options.add) {
    add(options);
  }
};
