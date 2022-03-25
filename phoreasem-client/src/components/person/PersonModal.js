import React from 'react'
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
    useDisclosure,
} from "@chakra-ui/react";

const PersonModal = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  return (
    <Modal size="4xl" isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>person</Tab>
                <Tab>team</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* <UpdatePersonPanel></UpdatePersonPanel> */}
                </TabPanel>
                <TabPanel>{/* <MembershipPanel></MembershipPanel> */}</TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
  )
}

export default PersonModal