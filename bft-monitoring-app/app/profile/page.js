import styles from "./page.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <h1 className={styles.title}>Profile</h1>
          <p className={styles.subtitle}>Welcome to your profile page</p>

        
      </div>
    </div>
  );
}
