import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import PostRow from "./PostRow";

const PostTable = ({ posts, setPosts }) => {
  return (
    <Table variant="striped" size="sm" id="users">
      <Thead>
        <Tr>
          <Th>post</Th>
          <Th>person</Th>
          <Th>team</Th>
        </Tr>
      </Thead>
      <Tbody>
        {posts.map(post => (
          <PostRow
            post={post}
            posts={posts}
            setPosts={setPosts}
            key={post.id}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default PostTable;