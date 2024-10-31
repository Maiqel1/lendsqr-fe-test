"use client";
import { useState, useEffect, use } from "react";
import { User } from "@/types/user";
import styles from "./UserDetails.module.scss";
import { fetchUsers } from "@/utils/api";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params); // Unwrap params here

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const users = await fetchUsers();
        const foundUser = users.find((u: User) => u.id === resolvedParams.id);

        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        console.error("Error loading user details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [resolvedParams.id]); // Depend on resolvedParams.id

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className={styles.userDetailsPage}>
      <h1>User Details</h1>

      <div className={styles.section}>
        <h2>Personal Information</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Full Name</label>
            <p>
              {user.profile.firstName} {user.profile.lastName}
            </p>
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <p>{user.profile.phoneNumber}</p>
          </div>
          <div className={styles.field}>
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
          <div className={styles.field}>
            <label>BVN</label>
            <p>{user.profile.bvn}</p>
          </div>
          <div className={styles.field}>
            <label>Gender</label>
            <p>{user.profile.gender}</p>
          </div>
          <div className={styles.field}>
            <label>Marital Status</label>
            <p>{user.profile.maritalStatus}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Education and Employment</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Education Level</label>
            <p>{user.education.level}</p>
          </div>
          <div className={styles.field}>
            <label>Employment Status</label>
            <p>{user.education.employmentStatus}</p>
          </div>
          <div className={styles.field}>
            <label>Sector</label>
            <p>{user.education.sector}</p>
          </div>
          <div className={styles.field}>
            <label>Duration</label>
            <p>{user.education.duration}</p>
          </div>
          <div className={styles.field}>
            <label>Monthly Income</label>
            <p>
              ₦{user.education.monthlyIncome[0]} - ₦
              {user.education.monthlyIncome[1]}
            </p>
          </div>
          <div className={styles.field}>
            <label>Loan Repayment</label>
            <p>₦{user.education.loanRepayment}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Socials</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Twitter</label>
            <p>{user.socials.twitter}</p>
          </div>
          <div className={styles.field}>
            <label>Facebook</label>
            <p>{user.socials.facebook}</p>
          </div>
          <div className={styles.field}>
            <label>Instagram</label>
            <p>{user.socials.instagram}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Guarantor</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Full Name</label>
            <p>{user.guarantor.fullName}</p>
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <p>{user.guarantor.phoneNumber}</p>
          </div>
          <div className={styles.field}>
            <label>Email Address</label>
            <p>{user.guarantor.email}</p>
          </div>
          <div className={styles.field}>
            <label>Relationship</label>
            <p>{user.guarantor.relationship}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
