export type Ticket = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  description: string;
  type: string;
  attachment: string | null;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}