const { program } = require("commander");

program.version("0.0.1");

program.usage("command [options]");

program
  .command("browser [name...]")
  .usage("[name] [options]")
  .description("use chrome to open specified urls")
  .option("-a, --add", "add url to list")
  .option("-d, --delete <name>", "remove a url item by name")
  .option("-l, --list", "list all urls")
  .option("--name <name>", "site name")
  .option("--url <url>", "site url")
  .option("--all", "open all urls")
  .option("--safari", "use safari app open urls")
  .action((name, options) => {
    require("./lib/browser")(name, options);
  });

program.command("egg <name>").action((name, options) => {
  require("./lib/egg")(name, options);
});

program.command("dir <name>").action((name, options) => {
  console.log(name, options);
});

program.parse(process.argv);
