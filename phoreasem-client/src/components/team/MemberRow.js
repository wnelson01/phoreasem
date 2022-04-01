import React from 'react'
import { Tr, Td, Text, CloseButton } from '@chakra-ui/react';
import axios from 'axios';

const MemberRow = ({ member, members, setMembers }) => {

  const deleteMember = async () => {
    await axios.delete(`https://api.phoreasem.app/membership/${member.id}`);
    const newMembers = members.filter(i => i.id !== members.id);
    await setMembers(newMembers);
  }

  return (
    <Tr>
      <Td maxW='100%'>
        <Text>{member.person}</Text>
      </Td>
      <Td>
        <CloseButton margin='0 auto' onClick={deleteMember}/>
      </Td>
    </Tr>
  )
}

export default MemberRow