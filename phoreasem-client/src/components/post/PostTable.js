import React, { useEffect, useState } from "react";
import { Input, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import PostRow from "./PostRow";
import FuzzySearch from 'fuzzy-search';

const PostTable = ({ posts, setPosts }) => {
  const [postFilter, setPostFilter] = useState([]);
  const searcher = new FuzzySearch(posts, ['content', 'person', 'team'])

  useEffect(() => {
    setPostFilter(posts)
  }, [posts]);

  return (
    <Table variant="striped" size="sm" id="users">
      <Thead>
        <Tr>
          <Th>content</Th>
          <Th>person</Th>
          <Th>team</Th>
        </Tr>
        <Tr>
            <Th>
              <Input
                placeholder='filter'
                onChange={e => setPostFilter(searcher.search(e.target.value))} />
            </Th>
        </Tr>
      </Thead>
      <Tbody>
        {postFilter.map(post => (
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