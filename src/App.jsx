// src/App.jsx
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import ProfilePage from './pages/ProfilePage';
import StockPage from './pages/StockPage';
import HeaderNav from './components/HeaderNav';

function App() {
  return (
    <HashRouter>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/stocks" element={<StockPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
