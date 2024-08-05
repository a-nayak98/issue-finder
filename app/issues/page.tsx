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

type Issue = z.infer<typeof issueSchema>;

const issuesPage = () => {

  const [isLoaded, setIsLoaded] = useState<{ loading: boolean; data: Issue[] }>({ loading: true, data: [] })

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await axios.get("/api/issues");
        // console.log(data.data, "from api")
        setIsLoaded((prev) => ({ ...prev, loading: false, data: data.data }))
      } catch (error) {
        console.log(error)
        setIsLoaded({ loading: false, data: [] })
      }
    }
    getIssues();
  }, [])


  return (
    <section className='w-full h-full'>
      <Button><Link href="/issues/new">New Issue</Link></Button>
      <div className='mt-3 w-full h-[550px] border border-black '>
          {isLoaded.loading ? <SkeletonComponent /> : isLoaded.data.map((elm) => (<IssuesComp key={elm.id} data={elm} />)
          )}
      </div>
    </section>
  )
}

export default issuesPage;