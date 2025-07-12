import './List.css';
import TodoItem from './TodoItem.jsx';
const List = ({ todos }) => {
  return (
    <div className='List'>
      <h4>Todo List 🍏</h4>
      <input type='text' placeholder='검색어를 입력하세요' />
      <div className='todos_wrapper'>
        {todos.map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      </div>

      <div>test code 입니다</div>
    </div>
  );
};
export default List;
