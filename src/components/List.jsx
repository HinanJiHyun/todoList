import './List.css';
import TodoItem from './TodoItem.jsx';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App.jsx';

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    return todos.filter((todo) => {
      return todo.content.toLowerCase().includes(search.toLowerCase());
    });
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } =
    // 인수: 콜백함수, deps
    // deps에 포함된 값이 변경되었을때 콜백함수 실행
    // 콜백함수의 반환값을 그대로 반환해줌
    // deps을 기준으로 메모이제이션, 비어있다면 초기렌더링할때만 변경
    useMemo(() => {
      const totalCount = todos.length;
      const doneCount = todos.filter((v) => v.isDone).length;
      const notDoneCount = totalCount - doneCount;

      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    }, [todos]);

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className='List'>
      <h4>Todo List 🍏</h4>
      <div>total: {totalCount}</div>
      <div>done: {doneCount}</div>
      <div>notDone: {notDoneCount}</div>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        onChange={onChangeSearch}
        value={search}
      />
      <div className='todos_wrapper'>
        {filteredTodos.map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
};
export default List;
