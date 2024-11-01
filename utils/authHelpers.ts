interface StoredUser {
  username?: string;
  email: string;
  password: string;
}

const TEST_USER = {
  email: "user@lendsqr.com",
  password: "password123",
  username: "TestUser",
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
};

export const verifyPassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
};

export const initializeTestUser = async (): Promise<void> => {
  const storedTestUser = localStorage.getItem("testUser");
  if (!storedTestUser) {
    const hashedPassword = await hashPassword(TEST_USER.password);
    localStorage.setItem(
      "testUser",
      JSON.stringify({
        ...TEST_USER,
        password: hashedPassword,
      })
    );
  }
};

// Register user function
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  const hashedPassword = await hashPassword(password);
  const user = { username, email, password: hashedPassword };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isAuthenticated", "true");
};

export const loginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  await initializeTestUser();

  const testUserData = localStorage.getItem("testUser");
  if (testUserData) {
    const testUser = JSON.parse(testUserData) as StoredUser;
    if (testUser.email === email) {
      const isTestUserValid = await verifyPassword(password, testUser.password);
      if (isTestUserValid) {
        localStorage.setItem("isAuthenticated", "true");
        return true;
      }
    }
  }

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser) as StoredUser;
    if (user.email === email) {
      const isValid = await verifyPassword(password, user.password);
      if (isValid) {
        localStorage.setItem("isAuthenticated", "true");
        return true;
      }
    }
  }

  return false;
};

export const logoutUser = (): void => {
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};
