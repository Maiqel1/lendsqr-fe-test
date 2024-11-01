"use client";

import React, { use } from "react";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import styles from "@/styles/UserDetails.module.scss";
import { fetchUsers } from "@/utils/api";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
  }, [resolvedParams.id]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const UserHeader = () => (
    <>
      <button onClick={() => router.back()} className={styles.backButton}>
        <ArrowLeft size={20} />
        <span>Back to Users</span>
      </button>

      <div className={styles.titleRow}>
        <h1>User Details</h1>
        <div className={styles.actions}>
          <button
            className={`${styles.blacklistButton} ${
              user.status === "Blacklisted" ? styles.active : ""
            }`}
          >
            BLACKLIST USER
          </button>
          <button
            className={`${styles.activateButton} ${
              user.status === "Active" ? styles.active : ""
            }`}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            {user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                alt={`${user.profile.firstName} ${user.profile.lastName}`}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarFallback}>
                {user.profile.firstName.charAt(0)}
                {user.profile.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div className={styles.userMeta}>
            <h2>
              {user.profile.firstName} {user.profile.lastName}
            </h2>
            <p>{user.userName}</p>
          </div>
          <div className={styles.userTier}>
            <p>User's Tier</p>
            <div className={styles.stars}>
              <Star size={16} className={styles.starFilled} />
              <Star size={16} className={styles.starEmpty} />
              <Star size={16} className={styles.starEmpty} />
            </div>
          </div>
          <div className={styles.accountInfo}>
            <h3>₦{user.accountBalance}</h3>
            <p>{user.profile.bvn}/Providus Bank</p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button className={styles.active}>General Details</button>
          <button>Documents</button>
          <button>Bank Details</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and System</button>
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.userDetailsPage}>
      <UserHeader />

      <div className={styles.section}>
        <h2>Personal Information</h2>
        <div className={`${styles.grid} ${styles.personalInfoGrid}`}>
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
          <div className={styles.field}>
            <label>Children</label>
            <p>{user.profile.children || "None"}</p>
          </div>
          <div className={styles.field}>
            <label>Type of Residence</label>
            <p>{user.profile.residence}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Education and Employment</h2>
        <div className={`${styles.grid} ${styles.educationGrid}`}>
          <div className={styles.field}>
            <label>Level of Education</label>
            <p>{user.education.level}</p>
          </div>
          <div className={styles.field}>
            <label>Employment Status</label>
            <p>{user.education.employmentStatus}</p>
          </div>
          <div className={styles.field}>
            <label>Sector of Employment</label>
            <p>{user.education.sector}</p>
          </div>
          <div className={styles.field}>
            <label>Duration of Employment</label>
            <p>{user.education.duration}</p>
          </div>
          <div className={styles.field}>
            <label>Office Email</label>
            <p>{user.education.officeEmail}</p>
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
