import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data
      }
      newState = [newItem, ...state]
      break;
    }
    case 'REMOVE': {
      newState = state.filter(item => item.id !== action.id)
      break;
    }
    case 'EDIT': {
      newState = state.map(item => item.id === action.data.id ? { ...action.data } : item)
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '첫 번째 일기',
    date: 1642816305536
  }, {
    id: 2,
    emotion: 2,
    content: '두 번째 일기',
    date: 1642816305537
  }, {
    id: 3,
    emotion: 3,
    content: '세 번째 일기',
    date: 1642816305538
  }, {
    id: 4,
    emotion: 4,
    content: '네 번째 일기',
    date: 1642816305539
  }, {
    id: 5,
    emotion: 5,
    content: '다섯 번째 일기',
    date: 1642816305540
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)
  const diaryId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: diaryId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    diaryId.current += 1;
  }
  // REMOVE
  const onRemove = (id) => {
    dispatch({
      type: 'REMOVE',
      id
    });
  }
  // EDIT
  const onEdit = (id, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        date: new Date(date).getTime(),
        id,
        content,
        emotion
      }
    })
  }


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className='App'>
            {/* <Header text={'App'} leftChild={<Button text={"왼쪽 버튼"} onClick={() => alert('왼쪽 버튼 클릭')}></Button>} rightCHild={<Button text={"오른쪽 버튼"} onClick={() => alert('오른쪽 버튼 클릭')}></Button>}></Header>
        <h2>App</h2>
        <Button text={"버튼"} type={'positive'} onClick={console.log(1)}></Button>
        <Button text={"버튼"} type={'negative'} onClick={console.log(1)}></Button>
        <Button text={"버튼"} onClick={console.log(1)}></Button> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
