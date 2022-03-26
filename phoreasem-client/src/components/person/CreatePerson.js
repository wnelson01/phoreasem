import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const CreatePerson = ({ people, setPeople, onClose }) => {
  const [personName, setPersonName] = useState("");

  const createPerson = async () => {
    const response = await axios.post("https://api.phoreasem.app/person", {
      name: personName,
    });
    const newPeople = [...people, response.data];
    setPeople(newPeople);
    onClose();
  };

  return (
    <Stack>
      <FormControl>
        <Input onChange={(e) => setPersonName(e.target.value)} />
        <FormHelperText>enter the name of the person</FormHelperText>
      </FormControl>
      <Button onClick={createPerson}>Create</Button>
    </Stack>
  );
};

export default CreatePerson;
