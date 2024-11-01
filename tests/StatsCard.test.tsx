import React from "react";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "@/app/components/dashboard/statsCard/StatsCard";
import Image from "next/image";

describe("StatsCard Component", () => {
  const mockIcon = (
    <Image src='/icons/users.png' alt='' height={40} width={40} />
  );

  it("renders card with correct props", () => {
    render(
      <StatsCard icon={mockIcon} label='Users' value={100} type='users' />
    );

    // Check if label and value are rendered
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("applies correct type class", () => {
    const { container } = render(
      <StatsCard
        icon={mockIcon}
        label='Active Users'
        value={50}
        type='active'
      />
    );

    // Check if the correct type class is applied
    const iconContainer = container.querySelector(".icon.active");
    expect(iconContainer).toBeInTheDocument();
  });

  it("renders different types of stats", () => {
    const testCases = [
      { type: "users", label: "Users", value: 200 },
      { type: "active", label: "Active Users", value: 100 },
      { type: "loans", label: "Users with Loans", value: 50 },
      { type: "savings", label: "Users with Savings", value: 75 },
    ];

    testCases.forEach(({ type, label, value }) => {
      const { container } = render(
        <StatsCard
          icon={mockIcon}
          label={label}
          value={value}
          type={type as "users" | "active" | "loans" | "savings"}
        />
      );

      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value.toString())).toBeInTheDocument();
      expect(container.querySelector(`.icon.${type}`)).toBeInTheDocument();
    });
  });
});
