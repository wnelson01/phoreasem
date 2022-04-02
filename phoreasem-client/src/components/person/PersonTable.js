import React, { useEffect, useState } from "react";
import { Input, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import PersonRow from "./PersonRow";
import FuzzySearch from 'fuzzy-search';

const PersonTable = ({ people, setPeople }) => {
  const [peopleFilter, setPeopleFilter] = useState([]);

  const searcher = new FuzzySearch(people, ['name']);

  useEffect(() => {
    setPeopleFilter(people)
  }, [people]);

  return (
    <Table variant="striped" size="sm" id="users">
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>name</Th>
        </Tr>
        <Tr>
          <Th>
            <Input
              placeholder='filter by id' />
          </Th>
          <Th>
            <Input 
              placeholder='filter by name'
              onChange={(e) => {
                setPeopleFilter(searcher.search(e.target.value));
              }}/>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {peopleFilter.map((person) => (
          <PersonRow
            person={person}
            people={people}
            setPeople={setPeople}
            key={person.id}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default PersonTable;
