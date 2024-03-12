import styles from "./Tag.module.css";

export default function Tag({ content }) {
  return <div className={styles["tag"]}>{content}</div>;
}
