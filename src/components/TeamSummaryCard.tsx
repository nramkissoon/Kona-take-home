import { Box, chakra, Flex } from "@chakra-ui/react";

export const TeamSummaryCard = ({
  ryg,
  managerId,
  teamId,
  totalCheckIns,
  slackTeamId,
}: TeamCheckInSummary) => {
  return (
    <Box bg="kona.beige" p="15px" rounded="md" shadow="sm" fontSize="lg">
      <Box>
        Team: <chakra.span fontWeight="medium">{slackTeamId}</chakra.span>
      </Box>
      <Box>
        Manager: <chakra.span fontWeight="medium">{managerId}</chakra.span>
      </Box>
      <Flex justifyContent="space-between" mt="1em">
        <Box bg="kona.dark-gray" rounded="md" color="white" px="5px">
          Total Check-ins:{" "}
          <chakra.span fontWeight="medium">{totalCheckIns}</chakra.span>
        </Box>
        <Box bg="kona.green" rounded="md" color="white" px="5px">
          Green:{" "}
          <chakra.span fontWeight="medium">
            {(ryg.greenRatio * 100).toFixed(1)}%
          </chakra.span>
        </Box>
        <Box bg="kona.yellow" rounded="md" color="white" px="5px">
          Yellow:{" "}
          <chakra.span fontWeight="medium">
            {(ryg.yellowRatio * 100).toFixed(1)}%
          </chakra.span>
        </Box>
        <Box bg="kona.red" rounded="md" color="white" px="5px">
          Red:{" "}
          <chakra.span fontWeight="medium">
            {(ryg.redRatio * 100).toFixed(1)}%
          </chakra.span>
        </Box>
      </Flex>
    </Box>
  );
};
