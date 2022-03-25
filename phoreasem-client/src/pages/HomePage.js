import React from 'react'
import { Box, Container, Heading, SimpleGrid, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

const HomePage = () => {
  return (
      <Container minW='container.sm' maxW='container.xl'>
          <Heading p='2' as='h2' size='xl'>
              dashboard
          </Heading>
          <Heading as='h3' size='md'>
              Statistics
          </Heading>
          <SimpleGrid columns={[1, null, null, 2]} spacing='4'>
              <Box p='10' boxShadow={'md'} borderRadius='6'>
                  <Stat>
                      <StatLabel>people joined (30 days)</StatLabel>
                      <StatNumber>27</StatNumber>
                      <StatHelpText>
                        <StatArrow type='increase' />
                        4
                      </StatHelpText>
                  </Stat>
              </Box>
              <Box p='10' boxShadow={'md'} borderRadius='6'>
                  <Stat>
                      <StatLabel>total posts</StatLabel>
                      <StatNumber> 3582 </StatNumber>
                      <StatHelpText>
                          <StatArrow type='increase' />
                          13
                      </StatHelpText>
                  </Stat>
              </Box>
              <Box p='10' boxShadow={'md'} borderRadius='6'>
                  <Stat>
                      <StatLabel>new teams (30 days)</StatLabel>
                      <StatNumber>4</StatNumber>
                      <StatHelpText>
                          <StatArrow type='increase' />
                          1
                      </StatHelpText>
                  </Stat>
              </Box>
          </SimpleGrid>
      </Container>
  )
}

export default HomePage