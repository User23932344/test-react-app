import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/data">Заметки</Link></li>
          <li><Link to="/trash">Корзина</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
