import styled from "styled-components";

import { useRef, useState, useEffect } from "react";

interface Dimensions {
  height: number;
  width: number;
}

interface Cursor {
  x: number;
  y: number;
}

const Experience = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [windowSize, setWindowSize] = useState<Dimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const [cursorLoc, setCursorLoc] = useState<Cursor>({
    x: 0,
    y: 0,
  })

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    setCursorLoc({
      x: e.clientX,
      y: e.clientY,
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return
    const ctx = canvas.getContext("2d");
    if(!ctx) return
    
    canvas.height = windowSize.height,
    canvas.width = windowSize.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(cursorLoc.x, cursorLoc.y, 5, 0, 2*Math.PI)
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();
  }, [windowSize, cursorLoc])

  // Listeners
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])

  return(
    <>
    </>
  )
}

export default Experience