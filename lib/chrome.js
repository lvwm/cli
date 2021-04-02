const fs = require("fs");
const path = require("path");

const CONFIG_FILE_NAME = "config.json";

module.exports = (name, options) => {
  console.log(name, options);
  if (options.add) {
    const data = {
      chrome: {
        urls: [
          {
            name: options.name,
            url: options.url,
          },
        ],
      },
    };
    fs.writeFileSync(
      path.resolve(process.cwd(), CONFIG_FILE_NAME),
      JSON.stringify(data, null, 2)
    );
  }
};
