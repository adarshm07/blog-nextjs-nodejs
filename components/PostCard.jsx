import {
  AspectRatio,
  createStyles,
  Card,
  Text,
  Image,
  Button,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-toastify";
import { useFetchAllPosts } from "@/hooks/useFetchAllPosts";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function PostCard({ posts }) {
  const { classes } = useStyles();
  const fetchAllPosts = useFetchAllPosts();

  const deletePostById = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 201) toast("Blog post deleted.");
        fetchAllPosts();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  const cards = posts.map((article) => {
    const regex = /<img.+?src=["'](.+?)["'].*?>/g;
    const matches = regex.exec(article.description);
    let imageUrl;

    if (matches && matches.length > 0) {
      imageUrl = matches[1];
    } else {
      imageUrl = "http://via.placeholder.com/640x360";
    }
    return (
      <Card
        key={article._id}
        p="md"
        radius="md"
        component="div"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={imageUrl} />
        </AspectRatio>
        <Text
          className={classes.title}
          mt={5}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.title}
        </Text>
        <Button.Group flex justify="end" mt="md">
          <Button onClick={() => window.open(`/blog/${article._id}`)}>
            View
          </Button>
          <Button
            onClick={() => window.open(`/dashboard/posts/${article._id}`)}
          >
            Edit
          </Button>
          <Button onClick={(e) => deletePostById(article._id)}>Delete</Button>
        </Button.Group>
      </Card>
    );
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "25% 25% 25% 25%",
      }}
    >
      {cards}
    </div>
  );
}
