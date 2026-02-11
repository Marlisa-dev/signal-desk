import { NextResponse } from 'next/server';

// Temporary storage (replace with database later)
interface Ticket {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  description: string;
  type: string;
  attachment: string;
  status: string;
  createdAt: string;
}

const tickets: Ticket[] = [];
let nextId = 1;

export async function POST(request: Request) {
  // TODO: Get the JSON body from the request
    const body = await request.json();
    console.log('received body: ', body)

  // TODO: Create a ticket object with an ID
  const ticket = {
    id: nextId++,
    title: body.title,
    firstName: body.fname,
    lastName: body.lname,
    description: body.description,
    type: body.type,
    attachment: body.attachment,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  // TODO: Add it to the tickets array

  tickets.push(ticket)
  // TODO: Return it as JSON with status 201
  return NextResponse.json(ticket, {status: 201});
}

export async function GET() {
  // TODO: Return all tickets
  // (We'll use this later in the admin view)

  try {
    const response = await fetch("http://localhost:3000/api/tickets");
    if (!response.ok) {
        throw new Error(`Response Error: ${response.status}`)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }

}

