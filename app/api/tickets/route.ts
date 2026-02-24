import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


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
        priority: body.priority,
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  const where: Prisma.TicketWhereInput = {};

  if (type && type !== "all") where.type = type;
  if (status && status !== "all") where.status = status;
  if (priority && priority !== "all") where.priority = priority;

  if (dateFrom || dateTo) {
    where.createdAt = {};

    if (dateFrom) {
      where.createdAt.gte = new Date(dateFrom);
    }

    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.ticket.count({ where }),
  ]);

  return NextResponse.json({
    data: tickets,
    total,
    page,
    limit,
  });
}