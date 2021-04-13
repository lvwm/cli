const { program } = require("commander");

program.version("0.0.1");

program.usage('command [options]')

program
  .command("chrome [name...]")
  .usage("[name] [options]")
  .description("use chrome to open specified urls")
  .option("-a, --add", "add url to list")
  .option("-d, --delete <name>", "remove a url item by name")
  .option("-l, --list", "list all urls")
  .option("--name <name>", "site name")
  .option("--url <url>", "site url")
  .option("--all", "open all urls")
  .action((name, options) => {
    require("./lib/browser")(name, options);
  });

program.parse(process.argv);
