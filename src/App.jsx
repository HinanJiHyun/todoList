import './App.css';
import { useState, useRef } from 'react';
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

function App() {
  const [todos, setTodos] = useState(mockData);
  const isRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: isRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  return (
    <div className='App'>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} />
    </div>
  );
}

export default App;
