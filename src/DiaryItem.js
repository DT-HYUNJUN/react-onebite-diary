export default function DiaryItem({ id, author, content, emotion, created_date, onRemove }) {
  const handleRemove = () => {
    console.log(id)
    if (window.confirm(`${id}번 째 일기를 삭제?`)) {
      onRemove(id)
    }
  }
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정점수 : {emotion}</span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button onClick={handleRemove}>삭제하기</button>
    </div>
  )
}