import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Button from './components/Button';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header text={'App'} leftChild={<Button text={"왼쪽 버튼"} onClick={() => alert('왼쪽 버튼 클릭')}></Button>} rightCHild={<Button text={"오른쪽 버튼"} onClick={() => alert('오른쪽 버튼 클릭')}></Button>}></Header>
        <h2>App</h2>
        <Button text={"버튼"} type={'positive'} onClick={console.log(1)}></Button>
        <Button text={"버튼"} type={'negative'} onClick={console.log(1)}></Button>
        <Button text={"버튼"} onClick={console.log(1)}></Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
