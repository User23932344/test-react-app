import { useEffect, useState } from "react";
import styles from "./Welcome.module.scss";

export default function Welcome() {
  const [placeholder, setPlaceholder] = useState("");

  const [description, setDescription] = useState("");

  

  useEffect(() => {
    const updatePlaceholder = () => {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 12) setPlaceholder("Какие планы на сегодня?");
      else if (hour >= 12 && hour < 18) setPlaceholder("Что запишем?");
      else if (hour >= 18 && hour < 23) setPlaceholder("Как прошел твой день?");
      else setPlaceholder("Всё еще не спишь?");
    };

    updatePlaceholder();

    const interval = setInterval(updatePlaceholder, 60 * 1000);
    return () => clearInterval(interval);
  })

  return (
    <div className={styles.wrapper}>
      <input
      className={styles.new}
        type="text"
        placeholder={placeholder}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
