import DiaryItem from "./DiaryItem"

export default function DiaryList({ diaryList, onRemove }) {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((diary) => (
          <DiaryItem key={diary.id} {...diary} onRemove={onRemove} />
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: []
}