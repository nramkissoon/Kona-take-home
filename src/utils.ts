const getManagerIdTeamIdFromSlackTeamId = (slackTeamId: string) => {
  const components = slackTeamId.split("&");
  return {
    managerId: components[0] ?? "",
    teamId: components[1] ?? "",
  };
};

export const getTeamSummariesFromCheckInApiResponse = (
  apiResponseData: CheckInApiResponse
) => {
  const teamSummaries: TeamCheckInSummary[] = [];
  Object.keys(apiResponseData.data).forEach((slackTeamId) => {
    const checkIns = apiResponseData.data[slackTeamId];
    const { managerId, teamId } =
      getManagerIdTeamIdFromSlackTeamId(slackTeamId);

    if (checkIns) {
      let totalReds = 0,
        totalYellows = 0,
        totalGreens = 0;
      checkIns.forEach((checkIn) => {
        if (checkIn.selection === "red") {
          totalReds++;
        } else if (checkIn.selection === "yellow") {
          totalYellows++;
        } else if (checkIn.selection === "green") {
          totalGreens++;
        }
      });
      const redRatio = Number.parseFloat(
        (totalReds / checkIns.length).toPrecision(3)
      );
      const yellowRatio = Number.parseFloat(
        (totalYellows / checkIns.length).toPrecision(3)
      );
      const greenRatio = Number.parseFloat(
        (totalGreens / checkIns.length).toPrecision(3)
      );
      teamSummaries.push({
        slackTeamId,
        managerId,
        teamId,
        totalCheckIns: checkIns.length,
        startTimestamp: apiResponseData.startTimestamp,
        endTimestamp: apiResponseData.endTimestamp,
        ryg: {
          totalReds,
          totalYellows,
          totalGreens,
          redRatio,
          yellowRatio,
          greenRatio,
        },
      });
    }
  });
  return teamSummaries;
};

export const getMostGreenTeam = (teamSummaries: TeamCheckInSummary[]) => {
  return teamSummaries.sort((a, b) => {
    return b.ryg.greenRatio - a.ryg.greenRatio;
  })[0] as TeamCheckInSummary;
};

export const getLeastGreenTeam = (teamSummaries: TeamCheckInSummary[]) => {
  return teamSummaries.sort((a, b) => {
    return a.ryg.greenRatio - b.ryg.greenRatio;
  })[0] as TeamCheckInSummary;
};

export const getMostRedTeam = (teamSummaries: TeamCheckInSummary[]) => {
  return teamSummaries.sort((a, b) => {
    return b.ryg.redRatio - a.ryg.redRatio;
  })[0] as TeamCheckInSummary;
};
