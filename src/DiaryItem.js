import { useRef, useState } from "react"

export default function DiaryItem({ id, author, content, emotion, created_date, onRemove, onEdit }) {
  const [isEdit, setIsEdit] = useState(false)
  const [localContent, setLocalState] = useState(content)

  const localContentInput = useRef()

  const handleRemove = () => {
    if (window.confirm(`${id}번 째 일기를 삭제하시겠습니까?`)) {
      onRemove(id)
    }
  }

  const handleEdit = (e) => setLocalState(e.target.value)

  const toggleIsEdit = () => {
    setLocalState(content)
    setIsEdit((prev) => !prev)
  }

  const handleSubmit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus()
      return
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent)
      setIsEdit(false)
    }
  }

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정점수 : {emotion}</span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? <>
          <textarea ref={localContentInput} onChange={handleEdit} value={localContent} />
        </> : content}
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
  )
}