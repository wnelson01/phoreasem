import React from 'react'
import { Tr, Td, Text, CloseButton } from '@chakra-ui/react';
import axios from 'axios';

const PostRow = ({ post, posts, setPosts }) => {

  const deletePost = async () => {
    await axios.delete(`https://api.phoreasem.app/post/${post.id}`)
    const newPosts = posts.filter(po => po.id !== post.id);
    setPosts(newPosts);
  }

  return (
    <Tr>
       <Td maxW='100%'>
         <Text>{post.content}</Text>
       </Td>
      <Td>
        <Text>{post.person}</Text>
      </Td>
      <Td>
        <CloseButton margin='0 auto' onClick={deletePost}/>
      </Td>
    </Tr>
  )
}

export default PostRow