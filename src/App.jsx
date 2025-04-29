import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCards from "./pages/MyCards";
import CreateCard from "./pages/CreateCard";
import EditCard from "./pages/EditCard";
import CardDetails from "./pages/CardDetails";
import Favorites from "./pages/Favorites";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/my-cards"
            element={
              <ProtectedRoute requiredRole="business">
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-card"
            element={
              <ProtectedRoute requiredRole="business">
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-card/:id"
            element={
              <ProtectedRoute requiredRole="business">
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
