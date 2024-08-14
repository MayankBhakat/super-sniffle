// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Simulation } from "./pages/Simulation";
import { Game } from "./pages/Game";
import { Footer, Navbar } from "./components";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Game />}/>
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
