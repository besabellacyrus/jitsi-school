import React, { Component } from 'react'
import Immutable from 'immutable'

export default class DrawArea extends Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      lines: Immutable.List(),
    };
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }
  
    const point = this.relativeCoordinatesForEvent(mouseEvent);
  
    this.setState(prevState => {
      return {
        lines: prevState.lines.push(Immutable.List([point])),
        isDrawing: true,
      };
    });
  }
  
  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }
  
    const point = this.relativeCoordinatesForEvent(mouseEvent);
  
    this.setState(prevState => {
      return {
        lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
      };
    });
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  render() {
    return (
      <div ref="drawArea" onMouseDown={this.handleMouseDown} />
    )
  }
}