import { useState, useEffect } from "react";
import styles from "./UsersTable.module.scss";
import { User } from "@/types/user";
import { ListFilter } from "lucide-react";
import Link from "next/link";

interface UsersTableProps {
  users: User[];
  onFilterClick: () => void;
}

export const UsersTable = ({ users, onFilterClick }: UsersTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const usersPerPage = 9;

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    // Sort the users
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            {[
              "organization",
              "username",
              "email",
              "phone Number",
              "date joined",
              "status",
            ].map((key) => (
              <th key={key}>
                <div className={styles.headerCell}>
                  <span>{key.toUpperCase()}</span>
                  <button
                    className={styles.filterButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterClick();
                    }}
                  >
                    <ListFilter size={16} />
                  </button>
                  <span className={styles.sortIndicator}>
                    {sortConfig?.key === key &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </span>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.orgName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                {new Date(user.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>

              <td>
                <span
                  className={`${styles.status} ${
                    styles[user.status.toLowerCase()]
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className={styles.actionCell}>
                <button
                  className={styles.menuBtn}
                  onClick={(e) => toggleDropdown(user.id, e)}
                  data-dropdown
                >
                  ⋮
                </button>
                {activeDropdown === user.id && (
                  <div className={styles.dropdown} data-dropdown>
                    <Link
                      href={`/users/${user.id}`}
                      className={styles.dropdownItem}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className={styles.dropdownIcon}>👁️</span>
                      View Details
                    </Link>
                    <button
                      className={styles.dropdownItem}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className={styles.dropdownIcon}>⛔</span>
                      Blacklist User
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className={styles.dropdownIcon}>✓</span>
                      Activate User
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <div className={styles.showing}>
          Showing {indexOfFirstUser + 1} to{" "}
          {Math.min(indexOfLastUser, users.length)} out of {users.length}
        </div>
        <div className={styles.pageButtons}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (num) =>
                num === 1 ||
                num === totalPages ||
                (num >= currentPage - 1 && num <= currentPage + 1)
            )
            .map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`${styles.pageButton} ${
                  currentPage === number ? styles.active : ""
                }`}
              >
                {number}
              </button>
            ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
