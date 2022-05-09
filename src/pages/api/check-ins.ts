// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import csv from "csvtojson";
import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import path from "path";

const csvFilePath = "/data/rygs.csv";

// function to convert JSON returned from CSV file to internal format
const convertJsonDataToKonaCheckInObject = (
  json: KonaCheckInCsvJsonFormat[]
): KonaCheckIn[] => {
  return json.map((checkIn) => {
    const {
      Id,
      Timestamp,
      Elaboration,
      Emotion,
      MeetingHours,
      PrivateElaboration,
      Reactions,
      Selection,
      SlackMessageId,
      SlackOrgId,
      SlackTeamId,
      SlackUserId,
    } = checkIn;
    return {
      id: Id,
      timestamp: Number(Timestamp) * 1000,
      elaboration: Elaboration === "" ? undefined : Elaboration,
      emotion: Emotion === "" ? undefined : Emotion,
      meetingHours: MeetingHours === "null" ? null : MeetingHours,
      platform: "slack",
      privateElaboration:
        PrivateElaboration === "null" ? null : PrivateElaboration,
      reactions: Reactions === "null" ? null : Reactions,
      selection: Selection as "red" | "yellow" | "green",
      slackMessageId: SlackMessageId === "null" ? null : SlackMessageId,
      slackUserId: SlackUserId,
      slackOrgId: SlackOrgId,
      slackTeamId: SlackTeamId,
    };
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CheckInApiResponse>
) => {
  try {
    const { startDate, endDate } = req.query;
    if (
      !startDate ||
      !endDate ||
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    ) {
      res.status(400);
      return;
    }

    const json = await csv().fromFile(
      path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, csvFilePath)
    );

    const checkIns = convertJsonDataToKonaCheckInObject(json);

    // remove elaborations and reactions as they are not needed by client
    checkIns.forEach((checkIn) => {
      checkIn.elaboration = undefined;
      checkIn.reactions = undefined;
      checkIn.privateElaboration = null;
    });

    // organize checkIns by slackTeamId and filter by startDate and endDate
    const checkInsByTeam: { [slackTeamId: string]: KonaCheckIn[] } = {};
    checkIns.forEach((checkIn) => {
      if (
        checkIn.timestamp >= Number(startDate) &&
        checkIn.timestamp <= Number(endDate)
      ) {
        if (!checkInsByTeam[checkIn.slackTeamId]) {
          checkInsByTeam[checkIn.slackTeamId] = [checkIn];
        } else {
          checkInsByTeam[checkIn.slackTeamId]?.push(checkIn);
        }
      }
    });

    res.json({
      startDate: startDate,
      endDate: endDate,
      data: checkInsByTeam,
    });
    res.status(200);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default handler;
