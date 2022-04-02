import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import TeamRow from "./TeamRow";

const TeamTable = ({ teams, setTeams }) => {
  return (
    <Table variant="striped" size="sm" id="users">
      <Thead>
        <Tr>
          <Th>name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {teams.map(team => 
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
