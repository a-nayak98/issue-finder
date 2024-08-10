import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/types/validationSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();
    const { title, description } = data;
    // console.log(data,title,description)
    const requiredId = data.id;
    console.log(requiredId, "idddd");
    const validateData = createIssueSchema.parse({ title, description });
    const updatedIssue = await prisma.issue.update({
      where: {
        id: requiredId,
      },
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

// Adding Delete Functionality

// export async function DELETE(req: NextRequest, res: NextResponse){
//   try {
//     const url = new URL(req.url);
//     console.log(url)

//     const issueId = url.searchParams.get("id");
//     console.log(issueId)
//     const deletedIssue = await prisma.issue.delete({
//       where: {
//         id:issueId,
//       },
//     });
//     return NextResponse.json({message:"issue deleted"});
//   } catch (error) {
//     console.log(error);
//     return NextResponse.error();
//   }
// };
