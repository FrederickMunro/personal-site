import { useRef, useState, useEffect } from "react";

import styled from "styled-components";

import PageTitle from "./PageTitle";

interface Dimensions {
  height: number;
  width: number;
}

const Education = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [windowSize, setWindowSize] = useState<Dimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return
    const ctx = canvas.getContext("2d");
    if(!ctx) return
    
    canvas.height = windowSize.height,
    canvas.width = windowSize.width;

    ctx.fillStyle = '#a57c1b';
    ctx.fillRect(0, windowSize.height - windowSize.height/10, windowSize.width, windowSize.height/10);
  }, [windowSize])

  // Listeners
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return(
    <Canvas ref={canvasRef} />
  )
}

export default Education;

const Canvas = styled.canvas`
  position: fixed;
  background: #eecb8b;
`