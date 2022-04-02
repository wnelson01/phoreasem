import React, { useState } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Td,
  Tr,
  useDisclosure,
  IconButton,
  Input
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import PersonModal from "./PersonModal";
import axios from "axios";

const PersonRow = ({ person, people, setPeople }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deletePerson = async () => {
    await axios.delete(`https://api.phoreasem.app/person/${person.id}`);
    const newPeople = people.filter((per) => per.id !== person.id);
    setPeople(newPeople);
  };

  const changeName = async () => {
    await axios.patch(`https://api.phoreasem.app/person/${person.id}`, {
      name: newName});
    person.name = newName;
  }

  const [newName, setNewName] = useState(person.name);

  return (
    <>
      <Tr>
        <Td>
          <Editable defaultValue={person.name}
            onSubmit={changeName}>
            <EditablePreview />
            <Input as={EditableInput}
              onChange={e => setNewName(e.target.value)}/>
          </Editable>
        </Td>
        <Td>
          <IconButton icon={<ViewIcon />} onClick={onOpen} />
        </Td>
        <Td>
          <IconButton icon={<DeleteIcon />} onClick={deletePerson} />
        </Td>
        <Td>
          <PersonModal person={person} onClose={onClose} isOpen={isOpen} />
        </Td>
      </Tr>
    </>
  );
};

export default PersonRow;
