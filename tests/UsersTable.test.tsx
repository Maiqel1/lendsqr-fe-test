import { render, within } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";

import { UsersTable } from "@/app/components/usersTable/UsersTable";
import { User } from "@/types/user";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("UsersTable", () => {
  const mockUsers: User[] = [
    {
      id: "1",
      orgName: "Organization 1",
      userName: "user1",
      email: "user1@example.com",
      phoneNumber: "1234567890",
      createdAt: "2023-01-01T10:00:00Z",
      status: "Active",
      accountBalance: "0",
      education: {
        level: "Bachelor's",
        employmentStatus: "Employed",
        sector: "Tech",
        duration: "2 years",
        officeEmail: "user1@company.com",
        monthlyIncome: ["1000", "2000"],
        loanRepayment: "200",
      },
      profile: {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        avatar: "/path/to/avatar.png",
        gender: "Male",
        bvn: "12345678901",
        maritalStatus: "Single",
        children: "None",
        residence: "Own House",
      },
      socials: {
        twitter: "@user1",
        facebook: "user1",
        instagram: "@user1",
      },
      guarantor: {
        fullName: "Jane Doe",
        phoneNumber: "0987654321",
        email: "jane.doe@example.com",
        relationship: "Sister",
      },
    },
  ];

  const mockOnFilterClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with correct headers", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    const headers = [
      "ORGANIZATION",
      "USERNAME",
      "EMAIL",
      "PHONE NUMBER",
      "DATE JOINED",
      "STATUS",
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders user data correctly", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.orgName)).toBeInTheDocument();
      expect(screen.getByText(user.userName)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.phoneNumber)).toBeInTheDocument();
      expect(screen.getByText(user.status)).toBeInTheDocument();
    });
  });

  it("handles filter button click", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    const filterButtons = screen.getAllByRole("button", { name: "" }); // Filter buttons have no text
    fireEvent.click(filterButtons[0]);

    expect(mockOnFilterClick).toHaveBeenCalled();
  });

  it("shows dropdown menu when clicking menu button", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByText("Blacklist User")).toBeInTheDocument();
    expect(screen.getByText("Activate User")).toBeInTheDocument();
  });

  it("hides dropdown menu when clicking outside", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    // Open dropdown
    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    // Click outside
    fireEvent.click(document.body);

    expect(screen.queryByText("View Details")).not.toBeInTheDocument();
  });

  it("handles pagination correctly", () => {
    const manyUsers = Array.from({ length: 20 }, (_, i) => ({
      ...mockUsers[0],
      id: `${i + 1}`,
      userName: `user${i + 1}`,
    }));

    render(<UsersTable users={manyUsers} onFilterClick={mockOnFilterClick} />);

    // Check initial page
    expect(screen.getByText("Showing 1 to 9 out of 20")).toBeInTheDocument();

    // Go to next page
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    // Check second page
    expect(screen.getByText("Showing 10 to 18 out of 20")).toBeInTheDocument();
  });

  it("displays correct status styles", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    const activeStatus = screen.getByText("Active");
    expect(activeStatus.className).toContain("active");
  });

  it("formats dates correctly", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    // Check if the first user's date is formatted correctly
    // Note: This test might need adjustment based on your locale
    expect(screen.getByText(/Jan 1, 2023/)).toBeInTheDocument();
  });

  it("navigates to user details page when clicking view details", () => {
    render(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);

    // Open dropdown
    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    const viewDetailsLink = screen.getByText("View Details");
    expect(viewDetailsLink.closest("a")).toHaveAttribute("href", "/users/1");
  });
});
