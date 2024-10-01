/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Header/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/Header/BottomNav';
import { useState } from 'react';

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        </div>
        <BottomNav setActivePage={setActivePage} />
      </div>
    </Router>
  );
}

export default App;