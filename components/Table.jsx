import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import ContactModal from "./ContactModal";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some(
      (key) =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(query)
    )
  );
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data, setUpdate }) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => {
    return (
      <tr key={row._id}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.number}</td>
        <td>{row.subject}</td>
        {/* <td>{row.objection}</td> */}
        <td>
          <ContactModal id={row._id} setUpdate={setUpdate}>
            {row.name}
          </ContactModal>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />

      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === "number"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("number")}
            >
              Number
            </Th>
            <Th
              sorted={sortBy === "subject"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("subject")}
            >
              Subject
            </Th>
            {/* <Th
              sorted={sortBy === "objection"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("objection")}
            >
              Message
            </Th> */}
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <tr>
                <td
                  colSpan={
                    data.length > 0 && data[0] ? Object.keys(data[0]).length : 1
                  }
                >
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
