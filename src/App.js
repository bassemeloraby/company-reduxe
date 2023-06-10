import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import CompanyCard from "./components/CompanyCard";

export default function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companyCard/:id" element={<CompanyCard />} />
        </Routes>
      </div>
    </>
  );
}
