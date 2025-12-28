import { useState } from "react";
import { Item } from "../../types/Item";
import {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} from "../../services/itemsApi";
import styles from "./DataPage.module.scss";
import Modal from "../../components/Modal/Modal";


export default function DataPage() {
  const { data, isLoading, isError } = useGetItemsQuery();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //----------------------------------------------------------------------

  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const handleAdd = () => {
    setEditingItem(null);
    setTitle("");
    setDescription("");
    setModalOpen(true);
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createItem({
      title,
      description,
    });

    setModalOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleUpdate = async () => {
    if (!editingItem || !title.trim()) return;

    await updateItem({
      id: editingItem.id,
      title,
      description,
    });

    setModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || "");
    setModalOpen(true);
  };

  const handleDelete = (item: Item) => {
    setEditingItem(item);
    setDeleteModalOpen(true); // открываем только модалку удаления
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEditingItem(null);
  };

  const confirmDelete = async () => {
    if (!editingItem) return;

    await deleteItem(editingItem.id);
    setDeleteModalOpen(false);
    setEditingItem(null);
  };

  //----------------------------------------------------------------------
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ваши заметки</h1>

      <button onClick={handleAdd} className={styles.addButton}>
        Добавить заметку
      </button>

      {isLoading && <div className={styles.state}>Загрузка...</div>}
      {isError && <div className={styles.state}>Ошибка при загрузке</div>}

      {!isLoading && data && data.length === 0 && (
        <div className={styles.state}>Нет элементов</div>
      )}

      {data && data.length > 0 && (
        <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>{item.title}</div>
              {item.description && (
                <div className={styles.itemDescription}>{item.description}</div>
              )}
            </div>

            <div className={styles.itemActions}>
              <button className={styles.editButton}
              onClick={() => handleEdit(item)}>
                <img src="/Vector.svg" alt="Редактировать" />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(item)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7404 9L14.3942 18M9.60577 18L9.25962 9M19.2276 5.79057C19.5696 5.84221 19.9104 5.89747 20.25 5.95629M19.2276 5.79057L18.1598 19.6726C18.0696 20.8448 17.0921 21.75 15.9164 21.75H8.08357C6.90786 21.75 5.93037 20.8448 5.8402 19.6726L4.77235 5.79057M19.2276 5.79057C18.0812 5.61744 16.9215 5.48485 15.75 5.39432M3.75 5.95629C4.08957 5.89747 4.43037 5.84221 4.77235 5.79057M4.77235 5.79057C5.91878 5.61744 7.07849 5.48485 8.25 5.39432M15.75 5.39432V4.47819C15.75 3.29882 14.8393 2.31423 13.6606 2.27652C13.1092 2.25889 12.5556 2.25 12 2.25C11.4444 2.25 10.8908 2.25889 10.3394 2.27652C9.16065 2.31423 8.25 3.29882 8.25 4.47819V5.39432M15.75 5.39432C14.5126 5.2987 13.262 5.25 12 5.25C10.738 5.25 9.48744 5.2987 8.25 5.39432"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </li>

        ))}
      </ul>
      )}

      {/* Модалка создания/редактирования */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingItem ? "Редактирование элемента" : "Добавление элемента"}
        actions={
          <>
            <div className={styles.buttons}>
              <button
                className={styles.primary}
                onClick={editingItem ? handleUpdate : handleCreate}
              >
                Сохранить
              </button>

              <button className={styles.secondary} onClick={closeModal}>
                Отмена
              </button>
            </div>
          </>
        }
      >
        <div className={styles.text}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
      </Modal>

      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Перместить элемент в корзину?"
        actions={
          <>
            <div className={styles.buttons}>
              <button className={styles.secondary} onClick={closeDeleteModal}>
                Отмена
              </button>
              <button className={styles.danger} onClick={confirmDelete}>
                Переместить в корзину
              </button>
            </div>
          </>
        }
      >
        {editingItem && (
          <p>
            Вы уверены, что хотите переместить в корзину <strong>{editingItem.title}</strong>?
          </p>
        )}
      </Modal>
    </div>
  );
}
