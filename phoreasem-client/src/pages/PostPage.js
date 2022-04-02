import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import PostTable from "../components/post/PostTable";
import CreatePost from "../components/post/CreatePost";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [postsFilter, setPostsFilter] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadPosts = async () => {
    const response = await axios.get("https://api.phoreasem.app/post");
    setPosts(response.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setPostsFilter(posts);
  }, [posts]);

  return (
    <Container minW="container.lg.sm" maxW="container.lg.xl">
      <Heading p="2" as="h2" size="xl">
        posts
      </Heading>
      <Flex>
        <Button marginLeft="4" onClick={onOpen}>
          new post
        </Button>
        <Spacer />
        {/* { <TableSearc /> } */}
      </Flex>
      <PostTable posts={postsFilter} setPosts={setPosts} />
      <Modal size="4xl" isOpen = {isOpen} onClose = {onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create post</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <CreatePost
              posts = {posts}
              setPosts = {setPosts}
              onClose = {onClose}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PostPage;

