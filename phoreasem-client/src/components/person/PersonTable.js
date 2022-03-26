import React from 'react'
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import PersonRow from './PersonRow';

const PersonTable = ({ people, setPeople }) => {

  return (
    <Table variant='striped' size='sm' id='users'>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {people.map((person, i) => <PersonRow person={person} people={people} setPeople={setPeople} key={i} />)}
      </Tbody>
    </Table>
  )
}

export default PersonTable