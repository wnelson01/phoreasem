import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MemberPanel from "./MemberPanel";
import PostPanel from "./PostPanel";

const TeamModal = ({ team, isOpen, onClose }) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{team.name}</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>posts</Tab>
              <Tab>members</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PostPanel team={team}/>
              </TabPanel>
              <TabPanel>
                <MemberPanel team={team}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter/>
      </ModalContent>
    </Modal>
  );
};

export default TeamModal;
