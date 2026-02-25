import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Raw params.id:", id);

    const ticketId = parseInt(id);

    if (isNaN(ticketId)) {
      return NextResponse.json(
        { error: "Invalid ticket ID" },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ticketId = parseInt(id);

    const body = await request.json();
    const { status, updatedAt } = body;

    if (!status || !updatedAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await prisma.ticket.updateMany({
      where: {
        id: ticketId,
        updatedAt: new Date(updatedAt)
      },
      data: { status }
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Ticket modified by another user." },
        { status: 409 }
      );
    }

    const updatedTicket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    });

    return NextResponse.json(updatedTicket);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}