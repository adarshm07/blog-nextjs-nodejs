import { useEffect, useState } from "react";
import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconProgress,
  IconWorld,
  IconBuildingFactory,
} from "@tabler/icons-react";
import axios from "axios";
import AddCount from "./AddCount";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export function Count() {
  const [data, setData] = useState([]);

  const getCount = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/count/getAll`)
      .then((res) => {
        setData(res.data.data);
      });
  };

  useEffect(() => {
    getCount();
  }, []);
  console.log(data);
  return (
    <div style={{ marginTop: "20px", padding: "0 40px" }}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {/* {data && data.map((item) => <Card key={item.title} />)} */}
        <Card
          title={"Active Project"}
          count={data.activeProject}
          icon={<IconProgress />}
        />
        <Card
          title={"Completed Project"}
          count={data.completedProject}
          icon={<IconArrowUpRight />}
        />
        <Card title={"Countries"} count={data.countries} icon={<IconWorld />} />
        <Card
          title={"Industries Saved"}
          count={data.industriesSaved}
          icon={<IconBuildingFactory />}
        />
      </SimpleGrid>
      <AddCount
        activeProject={data.activeProject}
        completedProject={data.completedProject}
        countries={data.countries}
        industriesSaved={data.industriesSaved}
      />
    </div>
  );
}

function Card({ title, count, icon }) {
  const { classes } = useStyles();
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        {icon}
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>{count}</Text>
      </Group>
    </Paper>
  );
}
