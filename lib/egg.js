const path = require("path");
const fs = require("fs");
const execa = require("execa");

module.exports = async (name, opts) => {
  console.log(name, opts);
  const projectPath = path.resolve(__dirname, name);
  console.log(projectPath);
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log("new dir created.");
  } else {
    console.log('Error: same name directory already exists.');
    return;
  }
  execa("npm", ["init", "egg", "--type=simple"], {
    cwd: projectPath,
    shell: true,
    stdio: "inherit",
  });
};
