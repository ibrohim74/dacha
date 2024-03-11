import CityCards from "../city-card/CityCards";
import Form from "../form/Form";
import styles from "./HeroBox.module.css";

export default function HeroBox() {
  return (
    <div className={styles["hero-wrapper"]}>
      <Form />
      <CityCards />
    </div>
  );
}
