import './TodoItem.css';
import { memo } from 'react';
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
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

// App 컴포넌트가 리랜더링이 되면서 객체타입의 함수들은 새로운 주소값으로 전달 props가 바꼈다고 판단하기 떄문에 리랜더링이 일어남
// 따라서, 객체타입(함수등..)의 props를 받고있는 컴포넌트는 memo만 적용한다고 해서 최적화가 되지않음
// 방법1. App 컴포넌트의 함수 onCreate, onUpdate, onDelete 자체를 useCallback을 이용해 memoization 한다
// 방법2. memo의 두번째 인수로 콜백함수를 넣어 최적화 기능을 커스터마이징한다
export default memo(TodoItem, (prevProps, nextProps) => {
  // 반환값에 따라, Props기 바뀌었는지 안바뀌었는지 판단
  // T -> Props 바뀌지 않음 -> 리랜더링 X
  // F -> Props 바뀜 -> 리랜더링 O

  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  return true;
});
