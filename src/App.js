import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import React, { useEffect, useReducer, useRef } from 'react';

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
  localStorage.setItem('diary', JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      diaryId.current = parseInt(diaryList[0].id) + 1

      dispatch({ type: 'INIT', data: diaryList })
    }
  }, [])

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
