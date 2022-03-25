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
  Text
} from "@chakra-ui/react";

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
                {/* <UpdatePersonPanel></UpdatePersonPanel> */}
              </TabPanel>
              <TabPanel>
                {/* <MembershipPanel></MembershipPanel> */}
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
