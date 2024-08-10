/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from 'react'
import { Button, Container, Dialog, Flex, Heading, IconButton, Text, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios';
import SkeletonComponent from '../components/SkeletonComp';
import IssuesComp from '../components/IssuesComp';
import { useAppDispatch, useAppSelector } from '../lib/hooks/hooks';
import { fetchIssuesFailure, fetchIssuesStart, fetchIssuesSuccess } from '../lib/features/issueSlice/issueSlice';
import { RootState } from '../lib/store/store';
import IssueCompModal from '../components/IssueCompModal';
import { MdDeleteSweep } from "react-icons/md";



const issuesPage = () => {
  const dispatch = useAppDispatch();
  const { issues, loading } = useAppSelector((state: RootState) => state.issues);
  console.log(issues,loading, "issues in redux store")

  const handleDeleteIssue = async (id:number) => {
    try {
      const res = await axios.delete(`/api/issues?id=${id}`);
      if (res.status === 200) {
        // Refetch the updated list of issues
        const updatedIssues = await axios.get("/api/issues");
        dispatch(fetchIssuesSuccess(updatedIssues.data)); // Update the Redux state
      }

    } catch (error) {
        console.log(error)
        dispatch(fetchIssuesFailure());
    }
}


  useEffect(() => {
    const getIssues = async () => {
      try {
        dispatch(fetchIssuesStart())
        const data = await axios.get("/api/issues");
        dispatch(fetchIssuesSuccess(data.data));
      } catch (error) {
        console.log(error)
        dispatch(fetchIssuesFailure())
      }
    }
    getIssues();
  }, [dispatch])
12

  return (
    <section className='w-full h-full'>
      <Button><Link href="/issues/new">New Issue</Link></Button>
      <div className='mt-3 w-full h-full'>
        {loading ? <SkeletonComponent /> : issues.map((elm) => {
          return (<>
          <div key={elm.id} className='mt-6 w-[60%] h-[120px] border border-black rounded pt-3 pl-3'>
            <Container size="4">
                <Flex direction="column" gap="2" className='relative'>
                    <div className='flex justify-end gap-3 pr-3 absolute top-0 right-0'>
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Button >Edit issue</Button>
                            </Dialog.Trigger>
                            <IssueCompModal data={elm} />
                        </Dialog.Root>
                        <Tooltip content="Delete Issue">
                            <IconButton radius="full">
                                <MdDeleteSweep onClick={()=>
                                  handleDeleteIssue(elm?.id)} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Heading as='h3'>{elm.title}</Heading>
                    <Text as='p'>{elm.description}</Text>
                </Flex>
            </Container>
        </div>
          </>)
        }
        )}
      </div>
    </section>
  )
}

export default issuesPage;