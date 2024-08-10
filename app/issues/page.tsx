/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios';
import SkeletonComponent from '../components/SkeletonComp';
import IssuesComp from '../components/IssuesComp';
import { useAppDispatch, useAppSelector } from '../lib/hooks/hooks';
import { fetchIssuesFailure, fetchIssuesSuccess } from '../lib/features/issueSlice/issueSlice';
import { RootState } from '../lib/store/store';


const issuesPage = () => {
  const dispatch = useAppDispatch();
  const { issues, loading } = useAppSelector((state: RootState) => state.issues);
  console.log(issues, "issues in redux store")

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await axios.get("/api/issues");
        dispatch(fetchIssuesSuccess(data.data));
      } catch (error) {
        console.log(error)
        dispatch(fetchIssuesFailure())
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