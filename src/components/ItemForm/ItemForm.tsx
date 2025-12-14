import { useState } from "react";
import { Item } from "../../types/Item";
import styles from "./ItemForm.module.scss";

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: { title: string; description?: string }) => void;
  onCancel: () => void;
}

export default function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Название
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Описание
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <div className={styles.actions}>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
}
