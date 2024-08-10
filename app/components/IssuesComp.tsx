import { Button, Container, Dialog, Flex, Heading, IconButton, Text, Tooltip } from '@radix-ui/themes'
import React, { PropsWithChildren, useState } from 'react'
import { issueSchema } from '../types/IssueSchemaType';
import z from 'zod';
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';
import IssueCompModal from './IssueCompModal';



type Issue = z.infer<typeof issueSchema>;

const IssuesComp: React.FC<{ data: Issue }> = ({ data }) => {
    // const [issuesData, setIssuesData] = useState<Issue>(data);


    
    return (
        <div className='mt-6 w-[60%] h-[120px] border border-black rounded pt-3 pl-3'>
            <Container size="4">
                <Flex direction="column" gap="2" className='relative'>
                    <div className='flex justify-end gap-3 pr-3 absolute top-0 right-0'>
                        {/* <form action=""> */}
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Button >Edit profile</Button>
                            </Dialog.Trigger>
                            <IssueCompModal data={data}/>
                        </Dialog.Root>
                        {/* </form> */}
                        <Tooltip content="Delete Issue">
                            <IconButton radius="full">
                                <MdDeleteSweep />
                            </IconButton>
                        </Tooltip>                  
                    </div>
                    <Heading as='h3'>{data.title}</Heading>
                    <Text as='p'>{data.description}</Text>
                </Flex>
            </Container>
        </div>
    )
}

export default IssuesComp