import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const IssueCompModal = () => {
    return (
        <>
        {/* <Dialog.Root> */}
            {/* <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger> */}

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
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextArea placeholder="Description" />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>

        {/* </Dialog.Root> */}
        </>
    )
}

export default IssueCompModal