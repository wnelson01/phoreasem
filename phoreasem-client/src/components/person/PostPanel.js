import React, { useEffect, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import PostRow from "./PostRow";

const PostsPanel = ({ person }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get(
        `https://api.phoreasem.app/post?person=${person.name}`
      );
      setPosts(response.data);
    };
    loadPosts();
    console.log(posts);
  }, [person.name]);

  return (
    <Stack>
      <Table variant='striped' size='sm' id='posts'>
        <Thead>
          <Tr>
            <Th>Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post, i) => (
            <PostRow
              post={post}
              posts={posts}
              setPosts={setPosts}
              key={post.id}
            />
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default PostsPanel