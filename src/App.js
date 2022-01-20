import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import RouteComponent from './components/Route';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h2>App</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        <RouteComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
