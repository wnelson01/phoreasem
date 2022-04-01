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
import TeamModal from "./TeamModal";
import axios from "axios";

const TeamRow = ({ team, teams, setTeams }) => {
  const [newName, setNewName] = useState(team.name);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteTeam = async () => {
    await axios.delete(`https://api.phoreasem.app/team/${team.id}`);
    const newTeams = teams.filter(i => i.id !== team.id);
    setTeams(newTeams);
  }

  const changeName = async () => {
    await axios.patch(`https://api.phoreasem.app/team/${team.id}`, {
      name: newName});
    team.team = newName;
  }

  return (
    <>
      <Tr>
        <Td>
          <Editable defaultValue={team.name}
            onSubmit={changeName}>
              <EditablePreview />
              <Input as={EditableInput}
                onChange={e => setNewName(e.target.value)} />
            </Editable>
        </Td>
        <Td>
          <IconButton icon={<ViewIcon />} onClick={onOpen} />
        </Td>
        <Td>
          <IconButton icon={<DeleteIcon />} onClick={deleteTeam} />
        </Td>
        <Td>
          <TeamModal team={team} onClose={onClose} isOpen={isOpen} />
        </Td>
      </Tr>
    </>
  )
}

export default TeamRow