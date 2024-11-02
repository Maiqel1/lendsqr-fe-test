import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserDetailsPage from "@/app/(user-routes)/users/[id]/page";
import { fetchUsers } from "@/utils/api";
import { useRouter } from "next/navigation";
import { mockUser } from "@/mocks/mockUser";
import "@testing-library/jest-dom";

jest.mock("@/utils/api", () => ({
  fetchUsers: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}));

describe("UserDetailsPage Component", () => {
  const router = { back: jest.fn() };
  (useRouter as jest.Mock).mockReturnValue(router);

  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue([mockUser]);
  });

  it("renders user details when data is available", async () => {
    render(<UserDetailsPage params={Promise.resolve({ id: mockUser.id })} />);

    await waitFor(() =>
      expect(screen.getByText("User Details")).toBeInTheDocument()
    );

    expect(screen.getByText(mockUser.profile.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it("shows 'User not found' message if user data is missing", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue([]);

    render(<UserDetailsPage params={Promise.resolve({ id: "999" })} />);
    await waitFor(() =>
      expect(screen.getByText("User not found")).toBeInTheDocument()
    );
  });

  it("navigates back when 'Back to Users' button is clicked", async () => {
    render(<UserDetailsPage params={Promise.resolve({ id: mockUser.id })} />);

    await waitFor(() =>
      expect(screen.getByText("Back to Users")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Back to Users"));
    expect(router.back).toHaveBeenCalled();
  });

  it("displays the correct user tier with filled and empty stars", async () => {
    render(<UserDetailsPage params={Promise.resolve({ id: mockUser.id })} />);

    await waitFor(() =>
      expect(screen.getByText("User's Tier")).toBeInTheDocument()
    );

    const stars = screen.getAllByRole("img", { hidden: true });
    expect(stars[0]).toHaveClass("starFilled");
    expect(stars[1]).toHaveClass("starEmpty");
  });
});
