const execa = require("execa");
const fs = require("fs");
const path = require("path");
const options = require("../utils/options");

function add(opts) {
  const item = {
    name: opts.name,
    url: opts.url,
  };
  let config = options.load();
  if (config.chrome && config.chrome.urls) {
    config.chrome.urls.push(item);
  } else {
    config = {
      chrome: {
        urls: [item],
      },
    };
  }
  options.save(config);
}

function deleteByName(name) {
  console.log("delete name: ", name);
  let config = options.load();
  if (config.chrome && config.chrome.urls) {
    let index = config.chrome.urls.findIndex((url) => url.name == name);
    if (index != -1) {
      config.chrome.urls.splice(index, 1);
    } else {
      console.log("error: the url name not found");
    }
  }
  options.save(config);
}

function list() {
  let config = options.load();
  if (config.chrome && config.chrome.urls) {
    for (url of config.chrome.urls) {
      console.log(url.name, "\t", url.url);
    }
  }
}

module.exports = (name, opts) => {
  console.log(name, opts);
  if (name && name.length > 0) {
    let config = options.load();
    if (config.chrome && config.chrome.urls) {
      const item = config.chrome.urls.find((item) => item.name == name);
      if (item) {
        execa(
          "open",
          ["-na", "Google Chrome", "--args"].concat(item.url)
        ).stdout.pipe(process.stdout);
      } else {
        console.log(`error: "${name}" item not found.`);
      }
    }
  }
  if (opts.add) {
    add(opts);
  }
  if (opts.delete) {
    deleteByName(opts.delete);
  }
  if (opts.list) {
    list();
  }
};
