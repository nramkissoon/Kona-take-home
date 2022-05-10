import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import {
  Column,
  HeaderGroup,
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { v4 as uuidv4 } from "uuid";

// Data needed for each row in the table
type TeamSummaryTableRowProps = Pick<
  TeamCheckInSummary,
  "slackTeamId" | "managerId" | "totalCheckIns"
> & {
  redRatio: number;
  greenRatio: number;
  yellowRatio: number;
  filterString: string;
};

// Input component for filtering rows based on user input
const GlobalFilter = (props: {
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}) => {
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  const spacing: InputGroupProps = {
    maxW: ["500px"],
    mr: "20px",
    mb: "1em",
  };

  const styles: InputProps = {
    shadow: "sm",
    borderColor: "gray.100",
    borderWidth: "1px",
    bg: "white",
  };

  return (
    <InputGroup {...spacing}>
      <InputLeftElement>
        <SearchIcon color="kona.dark-gray" />
      </InputLeftElement>
      <Input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={"Search teams..."}
        {...styles}
      />
    </InputGroup>
  );
};

interface TableSortColumnUiProps {
  column: HeaderGroup<any>;
  toggleSortBy: (
    columnId: string,
    descending: boolean,
    isMulti: boolean
  ) => void;
}

/**
 * If true, the column is sorted ascending.
    If false, the column is sorted descending
    If undefined, the column is not currently being sorted
 */
const sortedAsc = (b: boolean | undefined) => {
  if (b === undefined) return false;
  if (b) return false;
  return true;
};

// Component for sorting rows by ascending or descending
export const TableSortColumnUi = (props: TableSortColumnUiProps) => {
  const { column, toggleSortBy } = props;
  return (
    <Flex>
      <IconButton
        mr=".5em"
        size="sm"
        background={column.isSortedDesc ? "kona.green" : ""}
        aria-label="sort descending"
        icon={<TriangleDownIcon />}
        onClick={() => {
          column.isSortedDesc
            ? column.clearSortBy()
            : toggleSortBy(column.id, true, false);
        }}
        _hover={{
          background: "kona.green",
        }}
      />
      <IconButton
        size="sm"
        background={sortedAsc(column.isSortedDesc) ? "kona.green" : ""}
        aria-label="sort ascending"
        icon={<TriangleUpIcon />}
        onClick={() => {
          sortedAsc(column.isSortedDesc)
            ? column.clearSortBy()
            : toggleSortBy(column.id, false, false);
        }}
        _hover={{
          background: "kona.green",
        }}
      />
    </Flex>
  );
};

const RygCell = ({ color, value }: { color: string; value: number }) => {
  return (
    <Box
      bg={color}
      rounded="md"
      color="white"
      px="5px"
      fontWeight="medium"
      w="fit-content"
      textAlign="center"
      minWidth="30px"
    >
      {(value * 100).toFixed(1)}%
    </Box>
  );
};

export const TeamSummaryTable = ({
  summaries,
}: {
  summaries: TeamCheckInSummary[];
}) => {
  // summaries -> row props
  const data: TeamSummaryTableRowProps[] = React.useMemo(() => {
    return summaries.map((summary) => ({
      slackTeamId: summary.slackTeamId,
      totalCheckIns: summary.totalCheckIns,
      managerId: summary.managerId,
      redRatio: summary.ryg.redRatio,
      greenRatio: summary.ryg.greenRatio,
      yellowRatio: summary.ryg.yellowRatio,
      filterString: `${summary.slackTeamId}`,
    }));
  }, [summaries]);

  // defines columns in the table and how they are displayed
  const columns = React.useMemo(
    (): Column<TeamSummaryTableRowProps>[] => [
      {
        Header: "Team",
        accessor: "slackTeamId",
        id: "slackTeamId",
        Cell: (props) => <Box fontWeight="medium">{props.cell.value}</Box>,
      },
      {
        Header: "Manager",
        accessor: "managerId",
        id: "managerId",
        Cell: (props) => <Box fontWeight="medium">{props.cell.value}</Box>,
      },
      {
        Header: "Total Check-ins",
        accessor: "totalCheckIns",
        id: "totalCheckIns",
        Cell: (props) => (
          <Box
            bg="kona.dark-gray"
            rounded="md"
            color="white"
            px="5px"
            fontWeight="medium"
            w="fit-content"
            textAlign="center"
            minWidth="30px"
          >
            {props.cell.value}
          </Box>
        ),
      },
      {
        Header: "Green",
        accessor: "greenRatio",
        id: "greenRatio",
        Cell: (props) => (
          <RygCell color="kona.green" value={props.cell.value} />
        ),
      },
      {
        Header: "Yellow",
        accessor: "yellowRatio",
        id: "yellowRatio",
        Cell: (props) => (
          <RygCell color="kona.yellow" value={props.cell.value} />
        ),
      },
      {
        Header: "Red",
        accessor: "redRatio",
        id: "redRatio",
        Cell: (props) => <RygCell color="kona.red" value={props.cell.value} />,
      },
      {
        id: "filter-column",
        filter: "includes",
        accessor: "filterString",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    toggleSortBy,
    state: { globalFilter },
  } = useTable<TeamSummaryTableRowProps>(
    {
      columns: columns,
      data: data ? data : [],
      autoResetSortBy: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Box bg="kona.beige" rounded="md" shadow="sm" p="20px" mt="1em">
      <Heading textAlign="left" size="md" mb=".5em" as="h2" fontWeight="medium">
        Team Summaries
      </Heading>
      <Box h="50px">{GlobalFilter({ globalFilter, setGlobalFilter })}</Box>
      <Flex justifyContent="space-between" flexDir="column">
        <Box overflow="auto">
          <Table {...getTableProps()} fontSize="md">
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={uuidv4()}>
                  {headerGroup.headers.map((column) => {
                    if (column.id === "filter-column") {
                      column.toggleHidden(true);
                    }
                    return (
                      <Th
                        {...column.getHeaderProps()}
                        fontSize="sm"
                        fontWeight="medium"
                        borderColor="kona.dark-gray"
                        p="15px"
                        key={uuidv4()}
                      >
                        <Flex>
                          <Box my="auto">{column.render("Header")}</Box>
                          {!column.disableSortBy ? (
                            <>
                              <Spacer />
                              <TableSortColumnUi
                                column={column}
                                toggleSortBy={toggleSortBy}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={uuidv4()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          borderColor="kona.dark-gray"
                          p="15px"
                          key={uuidv4()}
                        >
                          {cell.render("Cell")}{" "}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};
