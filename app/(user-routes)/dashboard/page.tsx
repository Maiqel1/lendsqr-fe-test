"use client";

import { useState, useEffect } from "react";
import { UserFilter } from "@/app/components/userFilter/UserFilter";
import { UsersTable } from "@/app/components/usersTable/UsersTable";
import { StatsCard } from "@/app/components/dashboard/statsCard/StatsCard";
import { User, FilterParams } from "@/types/user";
import { fetchUsers } from "@/utils/api";
import styles from "@/styles/Dashboard.module.scss";

import Image from "next/image";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  const handleFilter = (params: FilterParams) => {
    const filtered = users.filter((user) => {
      return (
        (!params.organization ||
          user.orgName
            .toLowerCase()
            .includes(params.organization.toLowerCase())) &&
        (!params.username ||
          user.userName
            .toLowerCase()
            .includes(params.username.toLowerCase())) &&
        (!params.email ||
          user.email.toLowerCase().includes(params.email.toLowerCase())) &&
        (!params.date || user.createdAt.includes(params.date)) &&
        (!params.phoneNumber ||
          user.phoneNumber.includes(params.phoneNumber)) &&
        (!params.status || user.status === params.status)
      );
    });
    setFilteredUsers(filtered);
    setIsFilterVisible(false);
  };

  const handleReset = () => {
    setFilteredUsers(users);
    setIsFilterVisible(false);
  };

  const stats = [
    {
      icon: <Image src={"/icons/users.png"} alt='' height={40} width={40} />,
      label: "Users",
      value: users.length,
      type: "users" as const,
    },
    {
      icon: (
        <Image src={"/icons/activeusers.png"} alt='' height={40} width={40} />
      ),
      label: "Active Users",
      value: users.filter((u) => u.status === "Active").length,
      type: "active" as const,
    },
    {
      icon: (
        <Image src={"/icons/usersloan.png"} alt='' height={40} width={40} />
      ),
      label: "Users with Loans",
      value: users.filter(
        (u) =>
          parseFloat(u.education.loanRepayment.replace(/[^0-9.-]+/g, "")) > 0
      ).length,
      type: "loans" as const,
    },
    {
      icon: (
        <Image src={"/icons/userssavings.png"} alt='' height={40} width={40} />
      ),
      label: "Users with Savings",
      value: users.filter(
        (u) => parseFloat(u.accountBalance.replace(/[^0-9.-]+/g, "")) > 0
      ).length,
      type: "savings" as const,
    },
  ];

  return (
    <div className={styles.usersPage}>
      <h1>Users</h1>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className={styles.tableSection}>
        <UsersTable
          users={filteredUsers}
          onFilterClick={() => setIsFilterVisible(!isFilterVisible)}
        />
        {isFilterVisible && (
          <UserFilter
            isVisible={isFilterVisible}
            onFilter={handleFilter}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
