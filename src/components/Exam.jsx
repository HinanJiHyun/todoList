import { useReducer } from 'react';

// reducer: 변환기
// -> 상태를 실제로 변화시키는 변환기 역할
function reducer(state, action) {
  console.log(state, action);
  // if (action.type === 'INCREASE') {
  //   return state + action.data;
  // } else if (action.type === 'DECREASE') return state - action.data;
  switch (action.type) {
    case 'INCREASE':
      return state + action.data;
    case 'DECREASE':
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  // dispatch: 발송하다, 급송하다
  // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  // dispatch 함수를 호출하게 되면 상태변화가 요청이 되고
  // useReducer가 상태변화를 실제로 처리하게 될 함수를 호출하게 됨
  // 그 함수가 reducer 이고 state의 초기값을 전달할 수 있음
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변하길 원하는지 전달
    // -> 인수로 담고있는 객체는 action 객체라고 함
    dispatch({
      type: 'INCREASE',
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: 'DECREASE',
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};
export default Exam;
