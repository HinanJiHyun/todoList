import './App.css';
import { useState, useRef, useReducer, useCallback, createContext, useMemo } from 'react';
import Header from './components/Header.jsx';
import Editor from './components/Editor.jsx';
import List from './components/List.jsx';

// 변하지 않는 데이터는 컴포넌트 외부에 생성하는게 좋음
const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '출근하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '퇴근하기',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.targetId);
    default:
      return state;
  }
}

// context는 컴포넌트 외부에 선언한다
// 외부에서 사용하기 위해 export
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider
          // App컴포넌트의 todos State가 변경이 되어서 리렌더링이 일어나게 되면 해당 함수들도 재생성 되게 됨
          // useMemo를 사용
          value={memoizedDispatch}
        >
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
