// authHelpers.ts

// Hash the password using SHA-256
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
};

// Verify hashed password
export const verifyPassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
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

// Login user function
export const loginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser) as { email: string; password: string };
    if (user.email === email) {
      return await verifyPassword(password, user.password);
    }
  }
  return false;
};

// Logout user function
export const logoutUser = (): void => {
  localStorage.removeItem("isAuthenticated");
};
