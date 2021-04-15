const execa = require("execa");
const fs = require("fs");
const path = require("path");
const options = require("../utils/options");

let config = {};

function add(opts) {
  const item = {
    name: opts.name,
    url: opts.url,
  };
  if (options.urls) {
    config.chrome.urls.push(item);
  } else {
    config = {
      chrome: {
        urls: [item],
      },
    };
  }
  options.urls = config.chrome.urls;
}

function deleteByName(name) {
  console.log("delete name: ", name);
  if (options.urls) {
    let index = options.urls.findIndex((url) => url.name == name);
    if (index != -1) {
      config.chrome.urls.splice(index, 1);
    } else {
      console.log("error: the url name not found");
    }
  }
  options.urls = config.chrome.urls;
}

function list() {
  if (options.urls) {
    for (url of options.urls) {
      console.log(url.name, "\t", url.url);
    }
  }
}

module.exports = (name, opts) => {
  console.log(name, opts);
  config = options.load();
  if (name && name.length > 0) {
    if (options.urls) {
      const item = options.urls.find((item) => item.name == name);
<<<<<<< HEAD
      let url = '';
      try {
        url = item && item.url || name;
        execa(
          "open",
          ["-na", "Google Chrome", "--args"].concat(url)
        ).stdout.pipe(process.stdout);
      } catch (err) {
        console.log('error: ', err);
=======
      let url = "";
      try {
        url = (item && item.url) || name;
        let browser = "Google Chrome";
        let args = "-na";
        let cmd = [args, browser, "--args"].concat(url);
        if (opts.safari) {
          browser = "Safari";
          args = "-a";
          cmd = [args, browser].concat(url);
        }
        execa("open", cmd).stdout.pipe(process.stdout);
      } catch (err) {
        console.log("error: ", err);
>>>>>>> dev
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
  if (opts.all) {
    if (options.urls) {
      const items = options.urls.map((item) => {
        return item.url;
      });
      if (items) {
        execa(
          "open",
          ["-na", "Google Chrome", "--args"].concat(items)
        ).stdout.pipe(process.stdout);
      } else {
        console.log(`error: no urls saved in config file.`);
      }
    }
  }
};
