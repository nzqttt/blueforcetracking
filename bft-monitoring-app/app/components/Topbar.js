"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.iconWrapper}>
          <img src="/icons/kemalak_icon.png" alt="Kemalak Icon" />
        </div>
      </div>

      <span className={styles.title}>Blue Force Tracking</span>

      <div className={styles.nav}>
        <Link href="/map" className={styles.navLink}>Map</Link>
        <Link href="/profile">
          <FaUser className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
