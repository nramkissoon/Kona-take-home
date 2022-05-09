import { DateRangePicker } from "@/components/DateRangePicker";
import { PageContainer } from "@/components/PageContainer";
import { useCheckIns } from "@/components/useCheckIns";
import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data, isError, isLoading } = useCheckIns(startDate, endDate);
  console.log(data);
  return (
    <PageContainer>
      <Box>
        <Heading as="h1" textAlign="left" w="full" fontSize="2xl">
          Admin Dashboard
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
          Check-in Summary
        </Heading>
      </Box>
    </PageContainer>
  );
};

export default Home;
