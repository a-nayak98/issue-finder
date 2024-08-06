/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from 'react'
import { Button, Container, Flex, Skeleton, Text } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios';
import SkeletonComponent from '../components/SkeletonComp';
import IssuesComp from '../components/IssuesComp';
import z from "zod";
import { issueSchema } from '../types/IssueSchemaType';
import { useAppDispatch, useAppSelector } from '../lib/hooks/hooks';
import { fetchIssuesSuccess } from '../lib/features/issueSlice/issueSlice';
import { RootState } from '../lib/store/store';

type Issue = z.infer<typeof issueSchema>;

const issuesPage = () => {
  // const initialState = { loading: true, data: [] }
  // const [isLoaded, setIsLoaded] = useState<{ loading: boolean; data: Issue[] }>(initialState)
  const dispatch = useAppDispatch();
  const { issues, loading } = useAppSelector((state: RootState) => state.issues);
  console.log(issues, "issues in redux store")

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await axios.get("/api/issues");
        // console.log(data.data, "from api")
        // setIsLoaded((prev) => ({ ...prev, loading: false, data: data.data }))
        dispatch(fetchIssuesSuccess(data.data));
      } catch (error) {
        console.log(error)
        // setIsLoaded({ loading: false, data: [] })
      }
    }
    getIssues();
  }, [dispatch])


  return (
    <section className='w-full h-full'>
      <Button><Link href="/issues/new">New Issue</Link></Button>
      <div className='mt-3 w-full h-full'>
        {loading ? <SkeletonComponent /> : issues.map((elm) => (<IssuesComp key={elm.id} data={elm} />)
        )}
      </div>
    </section>
  )
}

export default issuesPage;