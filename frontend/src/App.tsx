// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Cases from "./pages/Cases";
import Case1 from "./pages/Case1";
import Case2 from "./pages/Case2";
import Case3 from "./pages/Case3";
import SystemTraining from "./pages/SystemTraining";
import GroupTraining from "./pages/GroupTraining";
import Lab from "./pages/lab/lab";

import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

// Компонент-обертка для работы useLocation вне Router
function AppWithRouter() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname.startsWith("/lab");

  return (
    <>
      {!hideNavbarAndFooter && (
        <Navbar onAuthClick={() => setShowAuthModal(true)} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keisy" element={<Cases />} />
        <Route path="/keis-1" element={<Case1 />} />
        <Route path="/keis-2" element={<Case2 />} />
        <Route path="/keis-3" element={<Case3 />} />
        <Route path="/sistema-trenirovok" element={<SystemTraining />} />
        <Route path="/gruppovye-trenirovki" element={<GroupTraining />} />
        <Route path="/lab/*" element={<Lab />} />
      </Routes>

      {!hideNavbarAndFooter && <Footer />}

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
}

export default App;
