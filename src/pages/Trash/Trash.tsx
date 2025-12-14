import styles from "./Trash.module.scss";

export default function Trash(){
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Тут хранятся недавно удаленные заметки.</h1>
            <p className={styles.text}>Они будут автоматически удалены через 30 дней.</p>
        </div>
    );
}