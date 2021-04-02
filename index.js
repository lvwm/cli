const { program } = require("commander");

program.version("0.0.1");

program
  .command("chrome [name]")
  .description("use chrome to open specified urls")
  .option("-a, --add", "add url to list")
  .option("--name <name>", "site name")
  .option("--url <url>", "site url")
  .action((name, options) => {
    require("./lib/chrome")(name, options);
  });

program.parse(process.argv);
