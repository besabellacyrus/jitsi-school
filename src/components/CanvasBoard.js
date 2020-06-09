import React, {useState, useEffect, useRef } from 'react'

function CanvasBoard({ reset }) {
  const [paintctx, setpaintctx] = useState(null) 

  var drawing = false;
  var x = 0;
  var y = 0;

  const canvasEl = useRef(null);

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");
    setpaintctx(ctx) 
  }, [])

  useEffect(() => {
    resetCanvas()
  }, [reset])

  const resetCanvas = () => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const mouseDown = (e) => { 
    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
  }

  const mouseMove = (e) => { 
    if (drawing === true) {
      drawLine(paintctx, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
    }; 
  }

  const mouseUp = (e) => {  
    if (drawing === true) {
      drawLine(paintctx, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;
      drawing = false;
    }
  } 
  

  const drawLine = (context, x1, y1, x2, y2) => {
    if (context) {
      context.beginPath();
      context.strokeStyle = 'red';
      context.lineWidth = 4;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    }
  }

  useEffect(() => {
    const canvas = canvasEl.current
    canvas.height = 620;
    canvas.width = 1021;
    canvas.addEventListener("mousedown", mouseDown)
    canvas.addEventListener("mousemove", mouseMove)
    canvas.addEventListener("mouseup", mouseUp)
    return function cleanup() {
      canvas.addEventListener("mousedown", mouseDown)
      canvas.addEventListener("mousemove", mouseMove)
      canvas.addEventListener("mouseup", mouseUp)
    };
  })

  return (
      <canvas ref={canvasEl} id="board"></canvas>
  )
}

export default CanvasBoard
