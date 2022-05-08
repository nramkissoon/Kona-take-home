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
      timestamp: Number(Timestamp),
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    res.json(checkIns);
    res.status(200);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default handler;
