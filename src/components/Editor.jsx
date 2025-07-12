import './Editor.css';
import {
  useRef,
  useState,
} from 'react';

const Editor = ({ onCreate }) => {
  const [content, setContent] =
    useState('');
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  return (
    <div className='Editor'>
      <input
        ref={contentRef}
        type='text'
        onKeyDown={onKeyDown}
        placeholder='새로운 Todo...'
        value={content}
        onChange={onChangeContent}
      />
      <button onClick={onSubmit}>
        추가
      </button>
    </div>
  );
};
export default Editor;
