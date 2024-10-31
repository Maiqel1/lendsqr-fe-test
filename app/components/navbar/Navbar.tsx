"use client";

import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

      <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
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

        <button className={styles.notificationButton}>
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
          <span className={styles.username}>Adedeji</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
