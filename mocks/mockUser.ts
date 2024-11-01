import { User } from "@/types/user";

export const mockUser: User = {
  id: "1",
  orgName: "OrgName",
  userName: "testuser",
  email: "test@example.com",
  phoneNumber: "1234567890",
  createdAt: "2023-10-01",
  status: "Active",
  accountBalance: "$1,000",
  education: {
    level: "Bachelor's",
    employmentStatus: "Employed",
    sector: "Tech",
    duration: "3 years",
    officeEmail: "office@example.com",
    monthlyIncome: ["2000", "4000"],
    loanRepayment: "500",
  },
  profile: {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    avatar: "",
    gender: "Male",
    bvn: "12345678901",
    maritalStatus: "Single",
    children: "None",
    residence: "Rented",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "facebook.com/johndoe",
    instagram: "@johndoe",
  },
  guarantor: {
    fullName: "Jane Doe",
    phoneNumber: "0987654321",
    email: "jane.doe@example.com",
    relationship: "Sister",
  },
};
