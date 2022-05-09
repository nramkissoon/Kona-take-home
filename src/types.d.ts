// shape of data for internal use in app, follows naming convention:
interface KonaCheckIn {
  id: string;
  timestamp: number;
  elaboration: string | undefined;
  emotion: string | undefined;
  meetingHours: string | null;
  platform: "slack";
  privateElaboration: string | null;
  reactions: any;
  selection: "red" | "yellow" | "green";
  slackMessageId: string | null;
  slackUserId: string;
  slackOrgId: string;
  slackTeamId: string;
}

// shape of data as read as JSON from CSV file
interface KonaCheckInCsvJsonFormat {
  Id: string;
  Timestamp: string;
  Elaboration: string;
  Emotion: string;
  MeetingHours: string;
  Platform: string;
  PrivateElaboration: string;
  Reactions: string;
  Selection: string;
  SlackMessageId: string;
  SlackUserId: string;
  SlackOrgId: string;
  SlackTeamId: string;
}

interface CheckInApiResponse {
  startDate: string;
  endDate: string;
  data: {
    [slackTeamId: string]: KonaCheckIn[];
  };
}
