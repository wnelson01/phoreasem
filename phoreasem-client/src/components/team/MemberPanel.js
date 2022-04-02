import React, { useEffect, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import MemberRow from "./MemberRow";

const MemberPanel = ({ team }) => {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const response = await axios.get(
        `https://api.phoreasem.app/membership?team=${team.name}`
      );
      setMembers(response.data);
    }
    loadMembers();
  }, [team.name]);

  async function addMember() {
    const response = await axios.post("https://api.phoreasem.app/membership", {
      person: member,
      team: team.name,
    });
    const newMembers = [...members, response.data];
    setMembers(newMembers);
  }

  return (
    <Stack>
      <FormControl>
        <Input
          placeholder="team"
          onChange={e => setMember(e.target.value)}
        />
      </FormControl>
      <Button type="submit" onClick={addMember}>
        add member
      </Button>
      <Table variant="striped" size="sm" id="teams">
        <Thead>
          <Tr>
            <Th>person</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map(member => (
            <MemberRow
              member={member}
              members={members}
              setMembers={setMembers}
              key={member.id}
            />
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default MemberPanel;