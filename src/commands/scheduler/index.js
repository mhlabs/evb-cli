const program = require("commander");
const browser = require("./browse-schedules");
const authHelper = require("../shared/auth-helper");

program
  .command("scheduler")
  .alias("s")
  .option("-n, --group-name [groupName]", "The name of the schduler group", "default")
  .option("-p, --profile [profile]", "AWS profile to use")
  .option("--region [region]", "The AWS region to use. Falls back on AWS_REGION environment variable if not specified")
  .description("Interact with EventBridge Scheduler")
  .action(async (cmd) => {
    authHelper.initAuth(cmd);
    await browser.browseSchedules(cmd);
  });

