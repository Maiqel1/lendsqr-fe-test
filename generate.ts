const fs = require("fs");

function generateData() {
  const organizations = ["Lendsqr", "Lendstar", "Irorun", "Kiakia", "Renmoney"];
  const data = [];

  for (let i = 0; i < 500; i++) {
    const firstName = `User${i}`;
    const lastName = `Test${i}`;
    const org = organizations[Math.floor(Math.random() * organizations.length)];

    data.push({
      id: i.toString(),
      orgName: org,
      userName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${org.toLowerCase()}.com`,
      phoneNumber: "0" + Math.floor(Math.random() * 9000000000 + 1000000000),
      createdAt: new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      status: ["Active", "Inactive", "Pending", "Blacklisted"][
        Math.floor(Math.random() * 4)
      ],
      accountBalance:
        "₦" +
        (Math.random() > 0.5 ? Math.random() * 1000000 : 0)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      accountNumber: "99" + Math.floor(Math.random() * 10000000 + 1000000),
      profile: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: "0" + Math.floor(Math.random() * 9000000000 + 1000000000),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        bvn: "" + Math.floor(Math.random() * 100000000000),
        maritalStatus: ["Single", "Married", "Divorced"][
          Math.floor(Math.random() * 3)
        ],
        children:
          Math.random() > 0.5 ? "None" : Math.floor(Math.random() * 3 + 1),
        residence: ["Parent’s Apartment", "Rented Apartment", "Owned Home"][
          Math.floor(Math.random() * 3)
        ],
      },
      education: {
        level: ["B.Sc", "HND", "M.Sc", "Ph.D"][Math.floor(Math.random() * 4)],
        employmentStatus: ["Employed", "Unemployed", "Self-employed"][
          Math.floor(Math.random() * 3)
        ],
        sector: ["FinTech", "Banking", "Technology", "Education"][
          Math.floor(Math.random() * 4)
        ],
        duration: `${Math.floor(Math.random() * 10 + 1)} years`,
        officeEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${org.toLowerCase()}.com`,
        monthlyIncome: [
          "₦" +
            (Math.random() * 400000 + 100000)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          "₦" +
            (Math.random() * 800000 + 200000)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
        ],
        loanRepayment:
          "₦" +
          (Math.random() > 0.5 ? Math.random() * 100000 : 0)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      },
      socials: {
        twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        facebook: `${firstName} ${lastName}`,
        instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      },
      guarantor: {
        fullName: `Guarantor${i} Surname${i}`,
        phoneNumber: "0" + Math.floor(Math.random() * 9000000000 + 1000000000),
        email: `guarantor${i}@${org.toLowerCase()}.com`,
        relationship: ["Parent", "Sibling", "Friend", "Colleague"][
          Math.floor(Math.random() * 4)
        ],
      },
    });
  }

  return data;
}

// Generate and save the data
const userData = generateData();
fs.writeFileSync("db.json", JSON.stringify({ users: userData }, null, 2));
console.log("Generated 500 user records in db.json");
