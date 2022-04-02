import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const CreatePost = ({ posts, setPosts, onClose }) => {
  const [postContent, setPostContent] = useState('');
  const [postPerson, setPostPerson] = useState('');
  const [postTeam, setPostTeam] = useState('');

  const createPost = async () => {
    const response = await axios.post("https://api.phoreasem.app/post", {
      content: postContent,
      person: postPerson,
      team: postTeam
    });
    const newPosts = [response.data, ...posts];
    setPosts(newPosts);
    onClose();
  };

  return (
    <Stack>
      <FormControl>
        <Input onChange={e => setPostContent(e.target.value)} />
        <FormHelperText>enter the content of the post</FormHelperText>
        <Input onChange={e => setPostPerson(e.target.value)} />
        <FormHelperText>enter the author of the post</FormHelperText>
        <Input onChange={e => setPostTeam(e.target.value)} />
        <FormHelperText>enter the team of the post</FormHelperText>
      </FormControl>
      <Button onClick={createPost}>Create</Button>
    </Stack>
  );
};

export default CreatePost;