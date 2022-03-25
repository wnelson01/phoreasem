import React from "react";
import {
  Box,
  Center,
  Divider,
  VStack,
  Stack,
  HStack,
  Link,
  Button,
  Flex
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Box
      paddingLeft={{ base: "0", md: "100" }}
      paddingRight={{ base: "0", md: "100" }}
    >
      <VStack>
        <HStack w='full' align='start'>
          <Link>
            <Button>Admin</Button>
          </Link>
          <Link>
            <Button>Person</Button>
          </Link>
        </HStack>
        <Divider orientation='horizontal'></Divider>
        <Center>
          <Stack maxW="100vw" direction={{ base: "column", md: "row" }}>
            <Box
              bgColor={{ base: "white", md: "unset" }}
              w={{ base: "full", md: "unset" }}
              maxW={{ base: "unset", md: "250px" }}
              top="0"
              position={{ base: "sticky", md: "relative " }}
              zIndex="1"
              boxShadow={{ base: "md", md: "none" }}
              h={{ md: "100vh" }}
            >
              <Sidebar />
            </Box>
            <Divider
              display={{ base: "none", md: "unset" }}
              h="100vh"
              boxShadow={"md"}
              orientation="vertical"
            ></Divider>
            <Box textAlign="left" w={{ md: "container.lg" }} overflow="auto">
              <Outlet />
            </Box>
          </Stack>
        </Center>
      </VStack>
    </Box>
  );
};

export default Layout;
