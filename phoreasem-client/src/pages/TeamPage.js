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
import TeamTable from "../components/team/TeamTable";
import CreateTeam from "../components/team/CreateTeam";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamsFilter, setTeamsFilter] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadTeams = async () => {
    const response = await axios.get("https://api.phoreasem.app/team");
    setTeams(response.data);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    setTeamsFilter(teams);
  }, [teams]);

  return (
    <Container minW="container.lg.sm" maxW="container.lg.xl">
      <Heading p="2" as="h2" size="xl">
        teams
      </Heading>
      <Flex>
        <Button marginLeft="4" onClick={onOpen}>
          new team
        </Button>
        <Spacer />
        {/* { <TableSearc /> } */}
      </Flex>
      <TeamTable teams={teamsFilter} setTeams={setTeams} />
      <Modal size="4xl" isOpen = {isOpen} onClose = {onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create team</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <CreateTeam
              teams = {teams}
              setTeams = {setTeams}
              onClose = {onClose}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TeamPage;
