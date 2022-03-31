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
import MembershipRow from "./MembershipRow";

const MembershipPanel = ({ person }) => {
  const [memberships, setMemberships] = useState([]);
  const [membership, setMembership] = useState([]);

  useEffect(() => {
    const loadMemberships = async () => {
      const response = await axios.get(
        `https://api.phoreasem.app/membership?person=${person.name}`
      );
      setMemberships(response.data);
    }
    loadMemberships();
  }, [person.name]);

  async function addMembership() {
    const response = await axios.post("https://api.phoreasem.app/membership", {
      person: person.name,
      team: membership,
    });
    const newMemberships = [...memberships, response.data];
    setMemberships(newMemberships);
  }

  return (
    <Stack>
      <FormControl>
        <Input
          placeholder="team"
          onChange={(e) => setMembership(e.target.value)}
        />
      </FormControl>
      <Button type="submit" onClick={addMembership}>
        add membership
      </Button>
      <Table variant="striped" size="sm" id="teams">
        <Thead>
          <Tr>
            <Th>Teams</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberships.map((membership, i) => (
            <MembershipRow
              membership={membership}
              memberships={memberships}
              setMemberships={setMemberships}
              key={membership.id}
            />
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default MembershipPanel;
