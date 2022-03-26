import React from 'react'
import { Td, Text, Tr, useDisclosure, IconButton } from '@chakra-ui/react';
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'
import PersonModal from './PersonModal';
import axios from 'axios';

const PersonRow = ({ person, people, setPeople }) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const deletePerson = async () => {
    await axios.delete(`https://api.phoreasem.app/person/${person.id}`)
    const newPeople = people.filter(per => per.id != person.id);
    setPeople(newPeople);
  }
  return (
    <>
      <Tr>
        <Td><Text noOfLines={1}>{person.id}</Text></Td>
        <Td><Text noOfLines={1}>{person.name}</Text></Td>
        <Td><IconButton icon={<ViewIcon />} onClick={onOpen} /></Td>
        <Td><IconButton icon={<DeleteIcon />} onClick={deletePerson} /></Td>
        <Td><PersonModal person={person} onClose={onClose} isOpen={isOpen} /></Td>
      </Tr>
    </>
  )
}

export default PersonRow