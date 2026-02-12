import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("received body: ", body);

    const ticket = await prisma.ticket.create({
      data: {
        title: body.title,
        firstName: body.fname,
        lastName: body.lname,
        description: body.description,
        type: body.type,
        attachment: body.attachment || null, // Make sure null if no file
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" }, // Newest first
  });

  return NextResponse.json(tickets);
}
