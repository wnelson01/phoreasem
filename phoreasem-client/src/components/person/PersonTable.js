import React from 'react'
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import PersonRow from './PersonRow';

const PersonTable = ({ people }) => {

  return (
      <Table variant='striped' size='sm' id='users'>
          <Thead>
              <Tr>
                  <Th>id</Th>
                  <Th>name</Th>
              </Tr>
          </Thead>
          <Tbody>
              {people.map((person, i) => <PersonRow person={person} key={i} />)}
          </Tbody>
      </Table>
  )
}

export default PersonTable