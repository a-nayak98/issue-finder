import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/types/validationSchema";

interface IDelete {
    id:string | null
}

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

export async function DELETE(req: NextRequest, res: NextResponse){
      try {
        const url = new URL(req.url);
        console.log(url)
    
        const issueId = url.searchParams.get("id");
        console.log(issueId)
        if (!issueId) {
            return NextResponse.json({ message: "Issue ID not provided" }, { status: 400 });
          }
        const deletedIssue = await prisma.issue.delete({
          where: {
            id:parseInt(issueId),
          },
        });
        return NextResponse.json({message:"issue deleted",data:deletedIssue});
      } catch (error) {
        console.log(error);
        return NextResponse.error();
      }
    };

