import React from 'react'
import StudentProfile from "../components/StudentProfile";
import ChatBox from "../components/ChatBox";
import Board from "../components/Board";
import '../appClass.scss'

import StudentTeacherColumn from './StudentTeacherColumn';
function ActualClassTwo() {
  return (
    <div className="air-class-wrapper">
      <div className="board-container">
        <Board />
      </div>
      <StudentTeacherColumn />
      <div className="student-chat-container">
        <StudentProfile />
        <ChatBox />
      </div>
    </div>
  )
}

export default ActualClassTwo
