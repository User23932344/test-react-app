import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/data">Данные</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
