import { DateRangePicker } from "@/components/DateRangePicker";
import { PageContainer } from "@/components/PageContainer";
import { TeamSummaryCard } from "@/components/TeamSummaryCard";
import { useCheckIns } from "@/components/useCheckIns";
import {
  getLeastGreenTeam,
  getMostGreenTeam,
  getTeamSummariesFromCheckInApiResponse,
} from "@/utils";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data, isError, isLoading } = useCheckIns(startDate, endDate);
  const summaries = data ? getTeamSummariesFromCheckInApiResponse(data) : [];
  return (
    <PageContainer>
      <Box>
        <Heading as="h1" textAlign="left" w="full" fontSize="2xl">
          Kona Admin Dashboard
        </Heading>
      </Box>
      <Box mt="1em">
        <DateRangePicker
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      <Box mt="1em">
        <Heading
          as="h2"
          textAlign="left"
          w="full"
          fontSize="xl"
          fontWeight="medium"
          mb=".3em"
        >
          Check-in Summary:
        </Heading>
        {data && Object.keys(data.data).length > 0 && (
          <Box>
            <Flex
              justifyContent="space-between"
              flexDir={["column", null, null, null, "row"]}
            >
              <Box w="fit" minW="lg">
                <Text fontWeight="medium" fontSize="lg">
                  This team is the most green :)
                </Text>
                <TeamSummaryCard {...getMostGreenTeam(summaries)} />
              </Box>
              <Box w="fit" minW="lg">
                <Text fontWeight="medium" fontSize="lg">
                  This team is the least green, try reaching out to the manager!
                </Text>
                <TeamSummaryCard {...getLeastGreenTeam(summaries)} />
              </Box>
            </Flex>
          </Box>
        )}
        {data && Object.keys(data.data).length > 0 && <Box></Box>}
      </Box>
    </PageContainer>
  );
};

export default Home;
