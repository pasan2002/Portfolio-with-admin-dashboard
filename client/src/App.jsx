import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css"
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import PrivateRoute from './components/PrivateRoute';
import SkillsEditor from "./components/SkillsEditor";
import { Navigate} from "react-router-dom"

function MainContent() {
  return (
    <div className={styles.MainContent}>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/private-route" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
