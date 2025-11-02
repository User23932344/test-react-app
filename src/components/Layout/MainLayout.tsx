import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./layout.scss";

export default function MainLayout() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
