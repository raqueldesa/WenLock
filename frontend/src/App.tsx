// App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MiniDrawer from "./components/Drawer";
import Home from "./Pages/Home";
// import Usuarios from './components/Usuarios';
// import CadastroUsuarios from './components/CadastroUsuarios';

function App() {
  return (
    <Router>
      <MiniDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<div>user</div>} />
          <Route path="/cadastro-usuarios" element={<div>cadaaaaaa</div>} />
        </Routes>
      </MiniDrawer>
    </Router>
  );
}

export default App;
