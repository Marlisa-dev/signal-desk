import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // console.log("Received params:", params);
    // console.log("ID value:", params.id);
    // console.log("ID type:", typeof params.id);

  try {
    const { id } = await params;
    // Convert string ID to number
    const ticketId = parseInt(id)
    console.log("Parsed ID:", ticketId);
    console.log("Is NaN?", isNaN(ticketId));

    // Check if its valid number first
    if (isNaN(ticketId)) {
        return NextResponse.json(
            { error: "Invalid ticket ID" },
            { status: 400 } 
        )
    }
    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId }
    })
    
    if (!ticket) {
        return NextResponse.json(
            { error: "Ticket not found" },
            { status: 404 } 
        )
    }
    return NextResponse.json(ticket)

    
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}