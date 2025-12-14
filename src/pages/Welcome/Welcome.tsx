import styles from "./Welcome.module.scss";

export default function Welcome() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <p className={styles.subtitle}>
        Это стартовая страница приложения.
      </p>

      <div className={styles.card}>
        <h2>Что дальше?</h2>
        <p>Выберите раздел в меню слева, чтобы продолжить.</p>
      </div>
    </div>
  );
}
