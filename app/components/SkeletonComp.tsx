import { Container, Flex, Skeleton, Text } from '@radix-ui/themes'
import React from 'react'

const SkeletonComponent = () => {
  return (
    <div className='mt-6 ml-6 w-[60%] h-[120px] border border-black '>
        <Container size="2">
            <Flex direction="column" gap="2">
              <Text>
                <Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
              </Text>
              <Skeleton>
                <Text>Lorem ipsum dolor sit amet</Text>
              </Skeleton>
            </Flex>
          </Container>
    </div>
  )
}

export default SkeletonComponent