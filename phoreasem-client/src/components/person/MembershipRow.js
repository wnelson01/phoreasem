import React from 'react'
import { Tr, Td, Text, CloseButton } from '@chakra-ui/react';

const MembershipRow = ({ membership }) => {
  const deleteMembership = async () => {
    console.log('delete membership');
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