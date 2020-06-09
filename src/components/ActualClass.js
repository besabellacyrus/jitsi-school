import React from 'react';
import '../main.scss';
const ActualClass = () => {
  return (
    <div className="app-container">
      <div className="board-wrapper">
        <div className="lesson-material">
          <img src={require('../img/2.png')} alt="lesson 2" />
        </div>
        <div className="toolbar">
          <div className="tools">
            <div>
              <img src={require('../img/edit-pencil.svg')} alt="edit" />
            </div>
            <div>
              <img src={require('../img/trash.svg')} alt="trash" />
            </div>
            <div>
              <img src={require('../img/refresh.svg')} alt="refresh" />
            </div>
          </div>
          <div></div>
          <div className="page-control">
            <div>
              <img src={require('../img/cheveron-left.svg')} alt="left" />
            </div>
            <div>
              <span>01/20</span>
            </div>
            <div>
              <img src={require('../img/cheveron-right.svg')} alt="right" />
            </div>
          </div>
        </div>
      </div>
      <div className="video-wrapper">
        <div className="teacher-vid">teacher vid</div>
        <div className="student-vid">student vid</div>
      </div>
    </div>
  );
};

export default ActualClass;
