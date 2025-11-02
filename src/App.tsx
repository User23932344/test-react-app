import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Welcome from "./pages/Welcome";
import DataPage from "./pages/DataPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Welcome />} />
        <Route path="data" element={<DataPage />} />
      </Route>
    </Routes>
  );
}
