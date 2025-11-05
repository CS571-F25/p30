import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import ProfilePage from './pages/ProfilePage'
import StockPage from './pages/StockPage'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/info" element={<InfoPage/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
      <Route path="/stock" element={<StockPage/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
