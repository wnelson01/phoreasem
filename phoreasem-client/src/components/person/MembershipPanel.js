import React, { useEffect, useState } from "react";
import { Stack, FormControl, Input, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import axios from "axios";
import TeamRow from './MembershipRow';

const MembershipPanel = ({ person }) => {
  const [memberships, setMemberships] = useState([]);
  const [membership, setMembership] = useState([]);
  const loadTeams = async () => {
      const response = await axios.get(`https://api.phoreasem.app/team?person={person.id}`);
      setMemberships(response.data);
  }
  useEffect(() => {
      loadTeams();
  }, [])
  return (
    <Stack>
      <FormControl>
        <Input placeholder="team" onChange={(e) => setMembership(e.target.value)} />
      </FormControl>
      <Table variant='striped' size='sm' id='teams'>
          <Thead>
              <Tr>
                  <Th>Teams</Th>
              </Tr>
          </Thead>
          <Tbody>
              {memberships.map((team, i) => <TeamRow team={team} loadTeams={loadTeams} key={i} />)}
          </Tbody>
      </Table>
    </Stack>
  );
};

export default MembershipPanel;
