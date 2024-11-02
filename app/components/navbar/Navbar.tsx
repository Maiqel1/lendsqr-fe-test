"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      return;
    }

    const testUser = localStorage.getItem("testUser");
    if (testUser) {
      const user = JSON.parse(testUser);
      setUsername(user.username);
      return;
    }

    setUsername("Guest");
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href='/' className={styles.logo}>
          <Image
            src='/logo.svg'
            alt='Lendsqr Logo'
            width={120}
            height={30}
            priority
          />
        </Link>

        <div className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Search for anything'
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <Search size={20} color='#fff' />
          </button>
        </div>
      </div>

      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label='menu'
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${styles.rightSection} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
      >
        <Link href='/docs' className={styles.docsLink}>
          Docs
        </Link>

        <button className={styles.notificationButton} aria-label='notification'>
          <Bell size={20} />
        </button>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <Image
              src='/profile.png'
              alt='User avatar'
              width={32}
              height={32}
              className={styles.avatarImage}
            />
          </div>
          <span className={styles.username}>{username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
