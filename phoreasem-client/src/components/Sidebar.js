import { React, useState, useEffect } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Spacer,
  Stack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "home", url: "/" },
    { name: "person", url: "/person" },
    { name: "team", url: "/team" },
    { name: "post", url: "/post" },
  ];

  const [hide, setHide] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setHide(!hide);
    setVisible(!visible);
  };

  const viewportCheck = useBreakpointValue({ md: true });

  useEffect(() => {
    if (viewportCheck) {
      setVisible(true);
    } else {
      setVisible(!hide);
    }
  }, [viewportCheck, hide]);

  return (
    <Box p={2}>
      <Stack>
        <Flex>
          <Flex display={{ base: "flex", md: "none" }}>
            <Center>
              <IconButton
                icon={<HamburgerIcon />}
                position="absolute"
                marginLeft={"10"}
                onClick={handleClick}
              />
            </Center>
          </Flex>
          <Spacer />
          <VStack spacing="0" textAlign="center">
            <Heading w={"full"} as="h1">
              Phoreasem
            </Heading>
            <Heading w={"full"} as="h2" size="l">
              admin dashboard
            </Heading>
          </VStack>
          <Spacer />
        </Flex>
        <List spacing="2" textAlign="left" hidden={!visible}>
          {links.map((link, i) => (
            <ListItem key={i}>
              <Link as={RouterLink} to={link.url}>
                <Button w="full">{link.name}</Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default Sidebar;
