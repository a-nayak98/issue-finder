import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/types/validationSchema";

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        // return new Response("Invalid request", {status: 400})
        return NextResponse.json(validation.error.format(), {status: 400})
    }
    const issue = await prisma.issue.create({
        data:{title:body.title,description:body.description}
    })
    return NextResponse.json(issue,{status: 201})
}

export async function GET(request:NextRequest,response:NextResponse){
    try {
        const issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
    } catch (error) {
      console.log(error)  
    }
}

