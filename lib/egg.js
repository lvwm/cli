const path = require("path");
const fs = require("fs");
const execa = require("execa");
const validateProjectName = require("validate-npm-package-name");

module.exports = async (name, opts) => {
  console.log(name, opts);
  const projectPath = path.resolve(__dirname, name);
  console.log(projectPath);
  const result = validateProjectName(name);
  if (!result.validForNewPackages) {
    console.log("Error: invalid project name")
    exit(1)
  }
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log("new dir created.");
  } else {
    console.log("Error: same name directory already exists.");
    return;
  }
  execa("npm", ["init", "egg", "--type=simple"], {
    cwd: projectPath,
    shell: true,
    stdio: "inherit",
  });
};
