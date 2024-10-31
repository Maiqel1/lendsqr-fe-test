import styles from "@/styles/Dashboard.module.scss";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  type: "users" | "active" | "loans" | "savings";
}

export const StatsCard = ({ icon, label, value, type }: StatsCardProps) => (
  <div className={styles.statsCard}>
    <div className={`${styles.icon} ${styles[type]}`}>{icon}</div>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);
