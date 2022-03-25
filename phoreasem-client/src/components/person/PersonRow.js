import React from 'react'
import { Td, Text, Tr, useDisclosure, IconButton } from '@chakra-ui/react';
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'
import PersonModal from './PersonModal';

const PersonRow = ({ person }) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  return (
    <>
      <Tr>
          <Td><Text noOfLines={1}>{person.id}</Text></Td>
          <Td><Text noOfLines={1}>{person.name}</Text></Td>
          <Td><IconButton icon={<ViewIcon />} onClick={onOpen}/></Td>
          <Td><DeleteIcon /></Td>
          <Td><PersonModal person={person} onClose={onClose} isOpen={isOpen}/></Td>
      </Tr>
    </>
  )
}

export default PersonRow