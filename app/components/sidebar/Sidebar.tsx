"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import {
  Home,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  Settings,
  ChevronDown,
  Handshake,
  PiggyBank,
  UsersRound,
  UserRoundCheck,
  UserRoundX,
  UserRoundCog,
  Scroll,
  ChartColumn,
  SlidersHorizontal,
  BadgePercent,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [active, setActive] = useState("Users");

  const menuItems = [
    {
      section: "Switch Organization",
      icon: <Briefcase size={16} />,
      hasChevron: true,
    },
    { section: "Dashboard", icon: <Home size={16} /> },
    {
      section: "Customers",
      items: [
        { name: "Users", icon: <UsersRound size={16} /> },
        {
          name: "Guarantors",
          icon: (
            <Image
              src={"/icons/guarantors.png"}
              height={16}
              width={16}
              alt='guarabtors'
            />
          ),
        },
        { name: "Loans", icon: <DollarSign size={16} /> },
        { name: "Decision Models", icon: <Handshake size={16} /> },
        { name: "Savings", icon: <PiggyBank size={16} /> },
        {
          name: "Loan Requests",
          icon: (
            <Image
              src={"/icons/loanreq.png"}
              height={16}
              width={16}
              alt='loan requests'
            />
          ),
        },
        { name: "Whitelist", icon: <UserRoundCheck size={16} /> },
        { name: "Karma", icon: <UserRoundX size={16} /> },
      ],
    },
    {
      section: "Businesses",
      items: [
        { name: "Organization", icon: <Briefcase size={16} /> },
        {
          name: "Loan Products",
          icon: (
            <Image
              src={"/icons/loanreq.png"}
              height={16}
              width={16}
              alt='loan products'
            />
          ),
        },
        {
          name: "Savings Products",
          icon: (
            <Image
              src={"/icons/bank.png"}
              height={16}
              width={16}
              alt='savings products'
            />
          ),
        },
        {
          name: "Fees and Charges",
          icon: (
            <Image src={"/icons/coins.png"} height={16} width={16} alt='fees' />
          ),
        },
        {
          name: "Transactions",
          icon: (
            <Image
              src={"/icons/transactions.png"}
              height={16}
              width={16}
              alt=''
            />
          ),
        },
        {
          name: "Services",
          icon: (
            <Image
              src={"/icons/galaxy.png"}
              height={16}
              width={16}
              alt='loan requests'
            />
          ),
        },
        { name: "Service Account", icon: <UserRoundCog size={16} /> },
        { name: "Settlements", icon: <Scroll size={16} /> },
        { name: "Reports", icon: <ChartColumn size={16} /> },
      ],
    },
    {
      section: "Settings",
      items: [
        { name: "Preferences", icon: <SlidersHorizontal size={16} /> },
        { name: "Fees and Pricing", icon: <BadgePercent size={16} /> },
        { name: "Audit Logs", icon: <ClipboardList size={16} /> },
      ],
    },
  ];

  return (
    <div className={styles.sidebar}>
      {menuItems.map((menu, idx) => (
        <div key={idx} className={styles.section}>
          <div className={styles.sectionTitle}>{menu.section}</div>
          {menu.items ? (
            menu.items.map((item, subIdx) => (
              <Link
                href={`/dashboard`}
                key={subIdx}
              >
                <p
                  className={`${styles.menuItem} ${
                    active === item.name ? styles.active : ""
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </p>
              </Link>
            ))
          ) : (
            <Link href='/dashboard'>
              <p className={styles.menuItem}>
                <span className={styles.icon}>{menu.icon}</span>
                {menu.section}
                {menu.hasChevron && (
                  <span className={styles.chevron}>
                    <ChevronDown size={16} style={{ marginLeft: "5px" }} />
                  </span>
                )}
              </p>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
