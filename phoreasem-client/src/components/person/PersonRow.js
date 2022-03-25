import React from 'react'
import { Td, Text, Tr } from '@chakra-ui/react';
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'
import PersonModal from './PersonModal';

const PersonRow = ({ person }) => {
  return (
    <>
      <PersonModal/>
      <Tr>
          <Td><Text noOfLines={1}>{person.id}</Text></Td>
          <Td><Text noOfLines={1}>{person.name}</Text></Td>
          <Td><ViewIcon /></Td>
          <Td><DeleteIcon /></Td>
      </Tr>
    </>
  )
}

export default PersonRow