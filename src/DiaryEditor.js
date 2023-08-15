import React, { useContext, useEffect, useRef, useState } from "react"
import { DiaryDispatchContext } from "./App"

export default React.memo(function DiaryEditor() {
  const {onCreate} = useContext(DiaryDispatchContext)

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1
  })

  useEffect(() => {
    console.log('Diary Editor 렌더')
  })

  const authorInput = useRef()
  const contentInput = useRef()

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus()
      return
    }

    if (state.content.length < 5) {
      contentInput.current.focus()
      return
    }
    
    onCreate(state.author, state.content, state.emotion)
    setState({
      author: '',
      content: '',
      emotion: 1
    })
    alert('저장 성공')
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      {/* author */}
      <div>
        <input ref={authorInput} name="author" onChange={handleChangeState} type="text" value={state.author} />
      </div>
      {/* content */}
      <div>
        <textarea ref={contentInput} name="content" onChange={handleChangeState} value={state.content} />
      </div>
      {/* emotion */}
      <div>
        <label htmlFor="emotion">오늘의 감정점수 : </label>
        <select onChange={handleChangeState} name="emotion" value={state.emotion}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {/* submit */}
      <div>
        <input onClick={handleSubmit} type="submit" value="일기 저장하기" />
      </div>
    </div>
  )
})