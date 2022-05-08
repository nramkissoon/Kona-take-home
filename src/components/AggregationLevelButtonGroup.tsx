import { Button, ButtonGroup } from "@chakra-ui/react";

export const AggregationLevelButtonGroup = ({
  currentSelection,
  setAggregationLevel,
}: {
  currentSelection: "daily" | "weekly";
  setAggregationLevel: (aggregationLevel: "daily" | "weekly") => void;
}) => {
  return (
    <ButtonGroup variant="outline" isAttached size="md" colorScheme="blue">
      <Button
        onClick={() => setAggregationLevel("daily")}
        mr="-px"
        isDisabled={currentSelection === "daily"}
      >
        Daily
      </Button>
      <Button
        onClick={() => setAggregationLevel("weekly")}
        isDisabled={currentSelection === "weekly"}
      >
        Weekly
      </Button>
    </ButtonGroup>
  );
};
