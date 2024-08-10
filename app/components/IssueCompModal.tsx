"use client"
import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { issueSchema, } from "../types/IssueSchemaType"
import z from "zod"
import axios from 'axios'
import { useAppDispatch } from '../lib/hooks/hooks'
import { fetchIssuesFailure, fetchIssuesSuccess } from '../lib/features/issueSlice/issueSlice'


type IssueType = z.infer<typeof issueSchema>

const IssueCompModal: React.FC<{ data: IssueType }> = ({ data }: { data: IssueType }) => {

    const [updatedIssue, setUpdatedIssue] = useState<IssueType>({
        ...data
    })
    const dispatch = useAppDispatch();

    const currentIssueId = data.id;

    const editIssue = async () => {
        try {
            const response = await axios.put(`api/issues/${currentIssueId}`, updatedIssue)
            console.log("edit issue function is called.", updatedIssue, response)
            if (response.status === 200) {
                //       // Refetch the updated list of issues
                      const updatedIssues = await axios.get("/api/issues");
                      dispatch(fetchIssuesSuccess(updatedIssues.data)); // Update the Redux state
                    }
        } catch (error) {
            console.log(error)
            dispatch(fetchIssuesFailure());
        }
    }



    return (
        <>
            {/* <Dialog.Root> */}
            {/* <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger> */}
            <form action="">
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit issue</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to assigned issue.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Title
                            </Text>
                            <TextField.Root
                                value={updatedIssue?.title}
                                placeholder="Enter your full name"
                                onChange={(e) => setUpdatedIssue({
                                    ...updatedIssue,
                                    title: e.target.value
                                })}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description
                            </Text>
                            <TextArea
                                placeholder="Description"
                                value={updatedIssue?.description}
                                onChange={(e) => setUpdatedIssue({
                                    ...updatedIssue,
                                    description: e.target.value
                                })} />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={editIssue}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </form>
            {/* </Dialog.Root> */}
        </>
    )
}

export default IssueCompModal