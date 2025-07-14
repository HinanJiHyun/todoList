import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoContext } from '../App.jsx';

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className='TodoItem'>
      <input onChange={onChangeCheckbox} checked={isDone} type='checkbox' />
      <div className='content'>{content}</div>
      <div className='date'>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
