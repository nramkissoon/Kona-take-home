import { Button, ButtonGroup } from "@chakra-ui/react";

export const AggregationLevelButtonGroup = ({
  currentSelection,
  setAggregationLevel,
}: {
  currentSelection: "today" | "week";
  setAggregationLevel: (aggregationLevel: "today" | "week") => void;
}) => {
  return (
    <ButtonGroup variant="outline" isAttached size="md" colorScheme="blue">
      <Button
        onClick={() => setAggregationLevel("today")}
        mr="-px"
        isDisabled={currentSelection === "today"}
      >
        Today
      </Button>
      <Button
        onClick={() => setAggregationLevel("week")}
        isDisabled={currentSelection === "week"}
      >
        This Week
      </Button>
    </ButtonGroup>
  );
};
