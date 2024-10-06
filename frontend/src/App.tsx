// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MiniDrawer from "./components/Drawer";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import UserUpdate from "./Pages/UserUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <MiniDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register-user" element={<UserUpdate />} />
          <Route path="/update-user/:id" element={<UserUpdate />} />
        </Routes>
      </MiniDrawer>
    </Router>
  );
}

export default App;
