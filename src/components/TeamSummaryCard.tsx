import { Box, Flex, Text } from "@chakra-ui/react";

export const TeamSummaryCard = ({
  ryg,
  managerId,
  teamId,
  totalCheckIns,
  slackTeamId,
}: TeamCheckInSummary) => {
  return (
    <Box bg="gray.100" p="15px" rounded="md" shadow="sm" fontSize="lg">
      <Text>Team: {slackTeamId}</Text>
      <Text>Manager: {managerId}</Text>
      <Flex justifyContent="space-between">
        <Box>Total Check-ins: {totalCheckIns}</Box>
        <Box>Green: {ryg.greenRatio * 100}%</Box>
        <Box>Red: {ryg.redRatio * 100}%</Box>
        <Box>Yellow: {ryg.yellowRatio * 100}%</Box>
      </Flex>
    </Box>
  );
};
