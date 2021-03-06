import React , { useEffect } from 'react'
import { dragElement } from "../draggable"

const TeacherVideo = (props) => {

  useEffect(() => {
    dragElement(document.getElementById("teacher-video"), props);
  }, [])

  useEffect(() => {
    const vid = document.getElementById('teacher-video');
    if (vid.getBoundingClientRect().x > 805) {
      console.log('overlapped')
      vid.style.top = null
      vid.style.left = null
    } 
  })

  return (
    <div className="teacher-container">
      <div className="draggable-icon">
        <svg class="bi bi-box-arrow-up-left" width="1em" height="1em" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/>
          <path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/>
        </svg>
      </div>
      <div id="teacher-video" className="teacher-video-wrapper drag">
        Teacher Video
      </div>
    </div>
  )
}

export default TeacherVideo
