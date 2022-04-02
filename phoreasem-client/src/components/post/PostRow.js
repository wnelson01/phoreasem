import React, { useState } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Td,
  Tr,
  IconButton,
  Input
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const PostRow = ({ post, posts, setPosts }) => {
  const [newContent, setNewContent] = useState(post.content);

  const deletePost = async () => {
    await axios.delete(`https://api.phoreasem.app/post/${post.id}`);
    const newPosts = posts.filter(i => i.id !== post.id);
    setPosts(newPosts);
  }

  const editPost = async () => {
    await axios.patch(`https://api.phoreasem.app/post/${post.id}`, {
      content: newContent
    });
    post.content = newContent;
  }
  return (
    <>
      <Tr>
        <Td>
          <Editable defaultValue={post.content}
            onSubmit={editPost}>
            <EditablePreview />
            <Input as={EditableInput}
              onChange={e => setNewContent(e.target.value)} />
          </Editable>
        </Td>
        <Td>
          <Editable defaultValue={post.person}
            onSubmit={editPost}>
            <EditablePreview />
            <Input as={EditableInput}
              onChange={e => setNewContent(e.target.value)} />
          </Editable>
        </Td>
        <Td>
          <Editable defaultValue={post.team}
            onSubmit={editPost}>
            <EditablePreview />
            <Input as={EditableInput}
              onChange={e => setNewContent(e.target.value)} />
            </Editable>
        </Td>
        <Td>
          <IconButton icon={<DeleteIcon />} onClick={deletePost} />
        </Td>
      </Tr>
    </>
  )
}

export default PostRow