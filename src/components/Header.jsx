import './Header.css';
import { memo } from 'react';
const Header = () => {
  return (
    <div className='Header'>
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// 자신이 받는 props가 변경되지않으면 리렌더링이 발생하지 않음
// const memoizedHeader = memo(Header);
// export default memoizedHeader;

export default memo(Header);
// export default Header;
