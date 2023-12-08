import React, { useRef, useState } from "react";
import { useDiaryDispatch } from "./App";

interface Props {
  id: number;
  author: string;
  content: string;
  emotion: number;
  created_date: number;
}

export default React.memo(function DiaryItem(props: Props) {
  const dispatch = useDiaryDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalState] = useState(props.content);

  const localContentInput = useRef<HTMLTextAreaElement>(null);

  const handleRemove = () => {
    if (window.confirm(`${props.id}번 째 일기를 삭제하시겠습니까?`)) {
      dispatch.onRemove(props.id);
    }
  };

  const handleEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => setLocalState(e.target.value);

  const toggleIsEdit = () => {
    setLocalState(props.content);
    setIsEdit((prev) => !prev);
  };

  const handleSubmit = () => {
    if (localContent.length < 5) {
      if (localContentInput.current) {
        localContentInput.current.focus();
        return;
      }
    }

    if (window.confirm(`${props.id}번 째 일기를 수정하시겠습니까?`)) {
      dispatch.onEdit(props.id, localContent);
      setIsEdit(false);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {props.author} | 감정점수 : {props.emotion}
        </span>
        <br />
        <span className="date">{new Date(props.created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea ref={localContentInput} onChange={handleEdit} value={localContent} />
          </>
        ) : (
          props.content
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={toggleIsEdit}>수정 취소</button>
          <button onClick={handleSubmit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
});
