import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";
import PostRow from "./PostRow";


const PostPanel = ({ team }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get(
        `https://api.phoreasem.app/post?team=${team.name}`
      );
      setPosts(response.data);
    };
    loadPosts();
  }, [team.name]);

  return (
    <Stack>
      <Table variant='striped' size='sm' id='posts'>
        <Thead>
          <Tr>
            <Th>post</Th><Th>person</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map(post => 
            <PostRow 
              post={post}
              posts={posts}
              setPosts={setPosts}
              key={post.id}
            />)}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default PostPanel