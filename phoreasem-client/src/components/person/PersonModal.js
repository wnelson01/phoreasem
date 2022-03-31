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
import MembershipPanel from './MembershipPanel';
import PostPanel from './PostPanel';

const PersonModal = ({ person, isOpen, onClose }) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{person.name}</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>posts</Tab>
              <Tab>memberships</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PostPanel person={person}/>
              </TabPanel>
              <TabPanel>
                <MembershipPanel person={person}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
