import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import PersonTable from '../components/person/PersonTable';

const PersonPage = () => {
  const [people, setPeople] = useState([]);
  // const [teams, setTeams] = useState();
  const [filteredPeople, setFilteredPeople] = useState([]);
  // const [personToEdit, setPersonToEdit] = useState({});
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const loadPeople = async () => {
    const response = await axios.get("https://api.phoreasem.app/person");
    setPeople(response.data);
  };

  useEffect(() => {
    loadPeople()
  }, []);

  useEffect(() => {
    setFilteredPeople(people)
  }, [people]);

  // const onEdit = (person) => {
  //   setPersonToEdit(person);
  // };
  return (
    <Container minW="container.sm" maxW="container.xl">
      <Heading p="2" as="h2" size="xl">
        people
      </Heading>
      <Flex>
        <Button marginLeft="4" onClick={onCreateOpen}>
          new person
        </Button>
        <Spacer />
        {/* <TableSearch rows={people} filteredRows={filteredPeople} setFilteredRows={setFilteredPeople} /> */}
      </Flex>
      <PersonTable people={filteredPeople} loadPeople={loadPeople} />
      <Modal size="4xl" isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Person</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>{/* <CreatePerson /> */}</ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PersonPage;
