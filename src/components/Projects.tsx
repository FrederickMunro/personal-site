
import styled from "styled-components";

import { useRef, useState, useEffect } from "react";

interface Dimensions {
  height: number;
  width: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface ProjectProps {
  cursor: Coordinates;
  windowSize: Dimensions;
}

const Projects = ({ cursor, windowSize }: ProjectProps) => {
    
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return
    const ctx = canvas.getContext("2d");
    if(!ctx) return
    
    canvas.height = windowSize.height,
    canvas.width = windowSize.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, windowSize.width, windowSize.height);

    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, 5, 0, 2*Math.PI)
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();
  }, [windowSize, cursor])

  return(
    <>
      <Canvas ref={canvasRef} />
    </>
  )
}
export default Projects

const Canvas = styled.canvas`
  position: fixed;
`