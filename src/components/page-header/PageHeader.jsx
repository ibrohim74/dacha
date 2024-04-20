import styles from "./PageHeader.module.css";

export default function PageHeader({ pageTitle, pageSubtitle }) {
  return (
    <header className={styles["page-title"]}>
      <div className={styles["page-title-left"]}>
        <h1>{pageTitle}</h1>
      </div>
      <div className={styles["page-title-right"]}>
        <h3>{pageSubtitle}</h3>
      </div>
    </header>
  );
}
