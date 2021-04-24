const execa = require("execa");

module.exports = (name, opts) => {
  console.log(name, opts);
  if (name) {
    execa(
      "open",
      ["-a", "iTerm"].concat(name)
    ).stdout.pipe(process.stdout);
  } else {
    console.log(`error: no dir name found.`);
  }
}