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
import PersonTable from "../components/person/PersonTable";
import CreatePerson from "../components/person/CreatePerson";

const PersonPage = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadPeople = async () => {
    const response = await axios.get("https://api.phoreasem.app/person");
    setPeople(response.data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    setFilteredPeople(people);
  }, [people]);

  return (
    <Container minW="container.sm" maxW="container.xl">
      <Heading p="2" as="h2" size="xl">
        people
      </Heading>
      <Flex>
        <Button marginLeft="4" onClick={onOpen}>
          new person
        </Button>
        <Spacer />
        {/* <TableSearch rows={people} filteredRows={filteredPeople} setFilteredRows={setFilteredPeople} /> */}
      </Flex>
      <PersonTable people={filteredPeople} setPeople={setPeople} />
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Person</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <CreatePerson
              people={people}
              setPeople={setPeople}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PersonPage;
