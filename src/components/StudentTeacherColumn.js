import React, { useState, useEffect } from 'react'
import StudentVideo from "../components/StudentVideo";
import TeacherVideo from "../components/TeacherVideo";

const StudentTeacherColumn = () => { 
  const [dragged, setDragged] = useState(false);

  const collision = ($div1, $div2) => {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  const handleOndrag = () => {
    console.log('dragging');
    setDragged(true)
  }

  const handleOnEndDrag = () => {
    console.log('done dragging');
    setDragged(false)
  }

  return (
    // eslint-disable-next-line no-template-curly-in-string
    <div id="stcolumn" className={ dragged ? 'teacher-student-wrapper video-dragged' : 'teacher-student-wrapper' }>
      <StudentVideo onDrag={handleOndrag} onEndDrag={handleOnEndDrag} />
      <TeacherVideo onDrag={handleOndrag} onEndDrag={handleOnEndDrag} />
    </div>
  )
}

export default StudentTeacherColumn
