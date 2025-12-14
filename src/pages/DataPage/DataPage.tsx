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
      <h1 className={styles.title}>Список элементов</h1>

      <button onClick={handleAdd} className={styles.addButton}>
        Добавить элемент
      </button>

      {isLoading && <div className={styles.state}>Загрузка...</div>}
      {isError && <div className={styles.state}>Ошибка при загрузке</div>}

      {!isLoading && data && data.length === 0 && (
        <div className={styles.state}>Нет элементов</div>
      )}

      {data && data.length > 0 && (<ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>{item.title}</div>
              {item.description && (
                <div className={styles.itemDescription}>{item.description}</div>
              )}
            </div>

            <div className={styles.itemActions}>
              <button onClick={() => handleEdit(item)}>Редактировать</button>
              <button onClick={() => handleDelete(item)}>Удалить</button>
            </div>
          </li>

        ))}
      </ul>
    )}


      {/* Модалка создания/редактирования */}
      <Modal open={modalOpen} onClose={closeModal}>
        <div>
          <h2>{editingItem ? "Редактирование элемента" : "Добавление элемента"}</h2>

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

          <button onClick={editingItem ? handleUpdate : handleCreate}>
            Сохранить
          </button>
          <button onClick={closeModal}>Отмена</button>
        </div>
      </Modal>

      {/* Модалка удаления */}
      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        {editingItem && (
          <div>
            <h2>Удалить элемент?</h2>
            <p>
              Вы уверены, что хотите удалить <strong>{editingItem.title}</strong>?
            </p>
            <button onClick={confirmDelete}>Удалить</button>
            <button onClick={closeDeleteModal}>Отмена</button>
          </div>
        )}
      </Modal>

    </div>
  );
}
