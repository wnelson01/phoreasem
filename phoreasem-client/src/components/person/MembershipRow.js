import React from 'react'
import { Tr, Td, Text, CloseButton } from '@chakra-ui/react';
import axios from 'axios';

const MembershipRow = ({ membership, memberships, setMemberships }) => {

  const deleteMembership = async () => {
    await axios.delete(`https://api.phoreasem.app/membership/${membership.membership_id}`);
    const newMemberships = memberships.filter(mem => mem.id !== membership.id);
    setMemberships(newMemberships);
  }

  return (
    <Tr>
      <Td maxW='100%'>
        <Text>{membership.team}</Text>
      </Td>
      <Td>
        <CloseButton margin='0 auto' onClick={deleteMembership}/>
      </Td>
    </Tr>
  )
}

export default MembershipRow