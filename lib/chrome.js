const execa = require("execa");
const fs = require("fs");
const path = require("path");

const config_file = path.resolve(process.cwd(), "config.json");

function add(options) {
  let config = {};
  const item = {
    name: options.name,
    url: options.url,
  };
  if (fs.existsSync(config_file)) {
    try {
      config = require(config_file);
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
  fs.writeFileSync(config_file, JSON.stringify(config, null, 2));
}

module.exports = (name, options) => {
  console.log(name, options);
  if (name && name.length > 0) {
    execa("open", ["-na", "Google Chrome", "--args"].concat(name)).stdout.pipe(process.stdout);
  }
  if (options.add) {
    add(options);
  }
};
