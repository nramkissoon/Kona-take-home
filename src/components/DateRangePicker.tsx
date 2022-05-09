import { Box, Flex, Heading } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}: {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}) => {
  return (
    <>
      <Heading
        as="h3"
        textAlign="left"
        w="full"
        fontSize="lg"
        fontWeight="medium"
        mb=".3em"
      >
        View team check-ins
      </Heading>
      <Flex>
        <Box mr="10px" fontSize="lg" fontWeight="medium">
          from:{" "}
        </Box>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </Flex>

      <Flex>
        <Box mr="10px" fontSize="lg" fontWeight="medium">
          to:{" "}
        </Box>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </Flex>
      {endDate < startDate && (
        <Box color="red.500" fontWeight="medium">
          End date must be after start date!
        </Box>
      )}
    </>
  );
};
