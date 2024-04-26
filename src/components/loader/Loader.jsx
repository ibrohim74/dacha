import { CircularProgress } from "@mui/material";
import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles["loader-container"]}>
      <CircularProgress color="inherit" />
    </div>
  );
}

export default Loader;
