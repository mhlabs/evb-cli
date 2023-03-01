const AWS = require("aws-sdk");

const patternBuilder = require("../shared/schema-browser");
const inputUtil = require("../shared/input-util");
const eventBridgeUtil = require("../shared/eventbridge-util");
async function browseSchedules(cmd) {
  const schedulerApi = new AWS.Scheduler();
  const scheduleList = [];

  let nextToken = null;
  do {
    const schedules = await schedulerApi.listSchedules(
      {
        GroupName: cmd.groupName,
        NamePrefix: cmd.namePrefix,
        NextToken: nextToken,
      },
    ).promise();
      
    scheduleList.push(...schedules.Schedules.map(async (s) => { await schedulerApi.getSchedule({ Name: schedules.Schedules[0].Name, GroupName: cmd.groupName }).promise() }));
    nextToken = schedules.NextToken;
  } while (nextToken);
  console.log(JSON.stringify(scheduleList, null, 2));
}

module.exports = {
  browseSchedules,
};
