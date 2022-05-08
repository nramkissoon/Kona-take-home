import { AggregationLevelButtonGroup } from "@/components/AggregationLevelButtonGroup";
import { PageContainer } from "@/components/PageContainer";
import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const [aggregationLevel, setAggregationLevel] = React.useState<
    "daily" | "weekly"
  >("daily");
  return (
    <PageContainer>
      <Box>
        <Heading as="h1" textAlign="left" w="full" fontSize="2xl">
          Admin Dashboard
        </Heading>
      </Box>
      <Box mt="1em">
        <Heading
          as="h2"
          textAlign="left"
          w="full"
          fontSize="lg"
          fontWeight="medium"
          mb=".3em"
        >
          View Team Check-In Data:
        </Heading>
        <AggregationLevelButtonGroup
          setAggregationLevel={setAggregationLevel}
          currentSelection={aggregationLevel}
        />
      </Box>
    </PageContainer>
  );
};

export default Home;
