import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserFilter } from "@/app/components/userFilter/UserFilter";

describe("UserFilter Component", () => {
  const mockOnFilter = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnFilter.mockClear();
    mockOnReset.mockClear();
  });

  it("renders all filter inputs", () => {
    render(
      <UserFilter
        isVisible={true}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />
    );

    // Check if all labels are present
    const labels = [
      "Organization",
      "Username",
      "Email",
      "Date",
      "Phone Number",
      "Status",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("submits filter form with user input", () => {
    render(
      <UserFilter
        isVisible={true}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />
    );

    // Fill out form inputs
    const organizationSelect = screen.getByLabelText("Organization");
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const dateInput = screen.getByLabelText("Date");
    const phoneInput = screen.getByLabelText("Phone Number");
    const statusSelect = screen.getByLabelText("Status");

    // Simulate user interactions
    fireEvent.change(organizationSelect, { target: { value: "Lendsqr" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(dateInput, { target: { value: "2023-01-01" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(statusSelect, { target: { value: "Active" } });

    // Submit the form
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    // Check if onFilter was called with correct data
    expect(mockOnFilter).toHaveBeenCalledWith({
      organization: "Lendsqr",
      username: "testuser",
      email: "test@example.com",
      date: "2023-01-01",
      phoneNumber: "1234567890",
      status: "Active",
    });
  });

  it("resets form when reset button is clicked", () => {
    render(
      <UserFilter
        isVisible={true}
        onFilter={mockOnFilter}
        onReset={mockOnReset}
      />
    );

    // Fill out form inputs
    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    // Click reset button
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    // Check if onReset was called and input was cleared
    expect(mockOnReset).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("");
  });
});
