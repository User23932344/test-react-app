import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.scss";

export default function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
