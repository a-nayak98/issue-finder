import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/types/validationSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(request:NextRequest,response:NextResponse){
    try {
        const data = await request.json();
        const {title,description} = data;
        // console.log(data,title,description)
        const  requiredId  = data.id;
        console.log(requiredId,"idddd")
        const validateData = createIssueSchema.parse({title,description})
        const updatedIssue = await prisma.issue.update({
            "where":{
                "id": requiredId
            },
            data:{
                title,
                description
            }
        })
        return NextResponse.json(updatedIssue)

    } catch (error) {
        console.log(error)
        return NextResponse.error();
    }
}