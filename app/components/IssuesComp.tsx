import { Container, Flex, Heading, Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'
import { issueSchema } from '../types/IssueSchemaType';
import z from 'zod';

type Issue = z.infer<typeof issueSchema>;

const IssuesComp: React.FC<{ data: Issue }> = ({data}) => {

    return (
        <div className='mt-6 ml-6 w-[60%] h-[120px] border border-black '>
            <Container size="2">
                <Flex direction="column" gap="2">
                    <Heading as='h3'>{data.title}</Heading>
                    <Text as='p'>{data.description}</Text>
                </Flex>
            </Container>
        </div>
    )
}

export default IssuesComp