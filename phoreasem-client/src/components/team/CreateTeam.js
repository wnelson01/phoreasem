import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const CreateTeam = ({ teams, setTeams, onClose }) => {
  const [teamName, setTeamName] = useState("");

  const createTeam = async () => {
    const response = await axios.post("https://api.phoreasem.app/team", {
      name: teamName,
    });
    const newTeams = [response.data, ...teams];
    setTeams(newTeams);
    onClose();
  };

  return (
    <Stack>
      <FormControl>
        <Input onChange={e => setTeamName(e.target.value)} />
        <FormHelperText>enter the name of the team</FormHelperText>
      </FormControl>
      <Button onClick={createTeam}>Create</Button>
    </Stack>
  );
};

export default CreateTeam;