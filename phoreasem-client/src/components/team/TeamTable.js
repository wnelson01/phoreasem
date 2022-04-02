import React, { useState, useEffect } from "react";
import { Input, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import TeamRow from "./TeamRow";
import FuzzySearch from 'fuzzy-search';

const TeamTable = ({ teams, setTeams }) => {
  const [teamFilter, setTeamFilter] = useState([]);

  const searcher = new FuzzySearch(teams, ['name']);

  useEffect(() => {
    setTeamFilter(teams)
  }, [teams]);

  return (
    <Table variant="striped" size="sm" id="users">
      <Thead>
        <Tr>
          <Th>name</Th>
          <Th>
            <Input
              placeholder='filter'
              onChange={e => setTeamFilter(searcher.search(e.target.value))}/>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {teamFilter.map(team => 
          <TeamRow
            team={team}
            teams={teams}
            setTeams={setTeams}
            key={team.id}
          />
        )}
      </Tbody>
    </Table>
  );
};

export default TeamTable;
