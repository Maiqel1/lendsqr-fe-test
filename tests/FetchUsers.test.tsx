import { API_URL, fetchUsers } from "../utils/api";
import { jest } from "@jest/globals";

const mockUsers = [
  { id: 1, name: "John Doe", status: "active" },
  { id: 2, name: "Jane Doe", status: "inactive" },
];

type FetchMock = jest.MockedFunction<typeof fetch>;

describe("fetchUsers", () => {
  let fetchMock: FetchMock;

  beforeAll(() => {
    fetchMock = jest.fn() as FetchMock;
    global.fetch = fetchMock;

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches users successfully", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const users = await fetchUsers();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`);
    expect(users).toEqual(mockUsers);
  });

  it("handles fetch error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Fetch failed"));

    await expect(fetchUsers()).rejects.toThrow("Fetch failed");
  });
});
