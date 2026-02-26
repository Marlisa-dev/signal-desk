import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear table first
  await prisma.ticket.deleteMany();

  // Reset auto-increment (SQLite only)
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name='Ticket';`,
  );

  await prisma.ticket.createMany({
    data: [
      {
        title: "Login button unresponsive on Safari",
        firstName: "Maria",
        lastName: "Lopez",
        description: "Clicking login does nothing on Safari 17. Works fine on Chrome.",
        type: "bug",
        priority: "high",
        status: TicketStatus.open,
      },
      {
        title: "Dark mode toggle request",
        firstName: "Daniel",
        lastName: "Kim",
        description: "Would love to see a dark mode option for the dashboard.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.in_progress,
      },
      {
        title: "Payment API intermittently failing",
        firstName: "Aisha",
        lastName: "Rahman",
        description: "Stripe requests timeout randomly during peak hours.",
        type: "bug",
        priority: "high",
        status: TicketStatus.blocked,
      },
      {
        title: "Typo in homepage hero section",
        firstName: "Chris",
        lastName: "Miller",
        description: "The word 'successful' is misspelled.",
        type: "feedback",
        priority: "low",
        status: TicketStatus.closed,
      },
      {
        title: "Allow CSV export from dashboard",
        firstName: "Emily",
        lastName: "Stone",
        description: "Need ability to export filtered tickets to CSV.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.open,
      },
      {
        title: "Mobile layout broken on iPhone 14",
        firstName: "Liam",
        lastName: "O'Connor",
        description: "Sidebar overlaps content when viewing on mobile.",
        type: "bug",
        priority: "high",
        status: TicketStatus.in_progress,
      },
      {
        title: "Add bulk close feature",
        firstName: "Sophia",
        lastName: "Nguyen",
        description: "Closing tickets one by one is time consuming.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.open,
      },
      {
        title: "Feedback form too long",
        firstName: "James",
        lastName: "Patel",
        description: "Users may drop off because of too many required fields.",
        type: "feedback",
        priority: "low",
        status: TicketStatus.closed,
      },
      {
        title: "Search filter resets on pagination",
        firstName: "Noah",
        lastName: "Johnson",
        description: "When navigating pages, search query disappears.",
        type: "bug",
        priority: "high",
        status: TicketStatus.blocked,
      },
      {
        title: "Add SLA tracking",
        firstName: "Olivia",
        lastName: "Davis",
        description: "We need SLA metrics for enterprise clients.",
        type: "idea",
        priority: "high",
        status: TicketStatus.in_progress,
      },
      {
        title: "Email notification not sent on reopen",
        firstName: "Ethan",
        lastName: "Clark",
        description: "Reopened tickets should notify the original reporter.",
        type: "bug",
        priority: "medium",
        status: TicketStatus.open,
      },
      {
        title: "Improve loading skeleton animations",
        firstName: "Ava",
        lastName: "Martinez",
        description: "Current loading state feels abrupt.",
        type: "feedback",
        priority: "low",
        status: TicketStatus.closed,
      },
      {
        title: "Database migration documentation needed",
        firstName: "Lucas",
        lastName: "Brown",
        description: "Engineers need better migration instructions.",
        type: "feedback",
        priority: "medium",
        status: TicketStatus.open,
      },
      {
        title: "Add keyboard shortcut for new ticket",
        firstName: "Mia",
        lastName: "Wilson",
        description: "Press 'n' to create new ticket.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.in_progress,
      },
      {
        title: "Pagination breaks at 3rd page",
        firstName: "Henry",
        lastName: "Taylor",
        description: "Next button stops working after page 3.",
        type: "bug",
        priority: "high",
        status: TicketStatus.blocked,
      },
      {
        title: "Dashboard cards misaligned",
        firstName: "Isabella",
        lastName: "Anderson",
        description: "Cards are not centered on wide screens.",
        type: "bug",
        priority: "low",
        status: TicketStatus.closed,
      },
      {
        title: "Add archived state",
        firstName: "Benjamin",
        lastName: "Thomas",
        description: "Closed tickets should eventually be archived.",
        type: "idea",
        priority: "low",
        status: TicketStatus.open,
      },
      {
        title: "Filter by assignee",
        firstName: "Charlotte",
        lastName: "Moore",
        description: "Need to filter tickets by assigned engineer.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.open,
      },
      {
        title: "Notification dropdown flickers",
        firstName: "Elijah",
        lastName: "Martin",
        description: "Dropdown closes unexpectedly when clicking inside.",
        type: "bug",
        priority: "high",
        status: TicketStatus.in_progress,
      },
      {
        title: "Add API documentation page",
        firstName: "Amelia",
        lastName: "Jackson",
        description: "Public API needs clearer docs.",
        type: "feedback",
        priority: "medium",
        status: TicketStatus.closed,
      },
      {
        title: "Improve error messaging",
        firstName: "Logan",
        lastName: "White",
        description: "Generic 500 errors should be more descriptive.",
        type: "feedback",
        priority: "high",
        status: TicketStatus.open,
      },
      {
        title: "Drag and drop upload fails for large files",
        firstName: "Harper",
        lastName: "Harris",
        description: "Files over 10MB are silently rejected.",
        type: "bug",
        priority: "high",
        status: TicketStatus.blocked,
      },
      {
        title: "Add analytics overview page",
        firstName: "Alexander",
        lastName: "Lewis",
        description: "Management wants overview of ticket trends.",
        type: "idea",
        priority: "medium",
        status: TicketStatus.in_progress,
      },
      {
        title: "Spacing issue in modal footer",
        firstName: "Ella",
        lastName: "Walker",
        description: "Buttons too close together on smaller screens.",
        type: "bug",
        priority: "low",
        status: TicketStatus.closed,
      },
      {
        title: "Auto-assign tickets by type",
        firstName: "Sebastian",
        lastName: "Hall",
        description: "Bugs go to backend team automatically.",
        type: "idea",
        priority: "high",
        status: TicketStatus.open,
      },
    ],
  });

  console.log("Database reseeded cleanly.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
