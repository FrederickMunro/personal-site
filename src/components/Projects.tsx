import styled from "styled-components";

import Mountains1 from '../assets/m1.png'
import Mountains2 from '../assets/m2.png'

import { useRef, useState, useEffect } from "react";

interface Dimensions {
  height: number;
  width: number;
}

interface Cursor {
  x: number;
  y: number;
}

const Projects = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [windowSize, setWindowSize] = useState<Dimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const [cursorLoc, setCursorLoc] = useState<Cursor>({
    x: 0,
    y: 0,
  })

  const cutoff = {
    day: 0.15,
    sunset: 0.04,
    evening: 0.015,
    night: 0,
  }

  const colorLayer1 = {
    day: [255, 255, 255],
    sunset: [255, 229, 119],
    evening: [250, 240, 230],
    night: [27, 27, 27],
  }

  const colorLayer2 = {
    day: [201, 252, 253],
    sunset: [254, 192, 81],
    evening: [185, 180, 199],
    night: [27, 27, 27],
  }

  const colorLayer3 = {
    day: [186, 253, 255],
    sunset: [255, 147, 103],
    evening: [92, 84, 112],
    night: [27, 27, 27],
  }

  const colorLayer4 = {
    day: [145, 252, 255],
    sunset: [253, 96, 81],
    evening: [53, 47, 68],
    night: [27, 27, 27],
  }

  const lerpColor = (color1: number[], color2: number[], t: number) => {
    const r = Math.round((1 - t) * color1[0] + t * color2[0]),
          g = Math.round((1 - t) * color1[1] + t * color2[1]),
          b = Math.round((1 - t) * color1[2] + t * color2[2]);
    return [r, g, b];
  }

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

    let gradient = ctx.createRadialGradient(
      cursorLoc.x,
      cursorLoc.y,
      0,
      cursorLoc.x,
      cursorLoc.y,
      windowSize.width > windowSize.height ? 1.1*windowSize.width : 1.1*windowSize.height
    );

    let background: string;
    if (cursorLoc.y < windowSize.height-windowSize.height*cutoff.day) {
      const t = (1-cursorLoc.y/windowSize.height - cutoff.day) / (1 - cutoff.day);
      const layer1 = lerpColor(colorLayer1.sunset, colorLayer1.day, t),
          layer2 = lerpColor(colorLayer2.sunset, colorLayer2.day, t),
          layer3 = lerpColor(colorLayer3.sunset, colorLayer3.day, t),
          layer4 = lerpColor(colorLayer4.sunset, colorLayer4.day, t);
      gradient.addColorStop(0.03, `rgb(${layer1[0]}, ${layer1[1]}, ${layer1[2]})`);
      gradient.addColorStop(0.075, `rgb(${layer2[0]}, ${layer2[1]}, ${layer2[2]})`);
      gradient.addColorStop(0.2, `rgb(${layer3[0]}, ${layer3[1]}, ${layer3[2]})`);
      gradient.addColorStop(0.4, `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`);
      background = `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`;
    } else if (cursorLoc.y < windowSize.height-windowSize.height*cutoff.sunset && cursorLoc.y >= windowSize.height-windowSize.height*cutoff.day) {
      const t = (1-cursorLoc.y/windowSize.height - cutoff.sunset) / (cutoff.day - cutoff.sunset);
      const layer1 = lerpColor(colorLayer1.evening, colorLayer1.sunset, t),
            layer2 = lerpColor(colorLayer2.evening, colorLayer2.sunset, t),
            layer3 = lerpColor(colorLayer3.evening, colorLayer3.sunset, t),
            layer4 = lerpColor(colorLayer4.evening, colorLayer4.sunset, t);
      gradient.addColorStop(0.03, `rgb(${layer1[0]}, ${layer1[1]}, ${layer1[2]})`);
      gradient.addColorStop(0.075, `rgb(${layer2[0]}, ${layer2[1]}, ${layer2[2]})`);
      gradient.addColorStop(0.2, `rgb(${layer3[0]}, ${layer3[1]}, ${layer3[2]})`);
      gradient.addColorStop(0.4, `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`);
      background = `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`;
    } else if (cursorLoc.y < windowSize.height-windowSize.height*cutoff.evening && cursorLoc.y >= windowSize.height-windowSize.height*cutoff.sunset) {
      const t = (1-cursorLoc.y/windowSize.height - cutoff.evening) / (cutoff.sunset - cutoff.evening);
      const layer1 = lerpColor(colorLayer1.night, colorLayer1.evening, t),
            layer2 = lerpColor(colorLayer2.night, colorLayer2.evening, t),
            layer3 = lerpColor(colorLayer3.night, colorLayer3.evening, t),
            layer4 = lerpColor(colorLayer4.night, colorLayer4.evening, t);
      gradient.addColorStop(0.03, `rgb(${layer1[0]}, ${layer1[1]}, ${layer1[2]})`);
      gradient.addColorStop(0.075, `rgb(${layer2[0]}, ${layer2[1]}, ${layer2[2]})`);
      gradient.addColorStop(0.2, `rgb(${layer3[0]}, ${layer3[1]}, ${layer3[2]})`);
      gradient.addColorStop(0.4, `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`);
      background = `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`;
    } else {
      gradient.addColorStop(0.03, `rgb(${colorLayer1.night[0]}, ${colorLayer1.night[1]}, ${colorLayer1.night[2]})`);
      gradient.addColorStop(0.075, `rgb(${colorLayer2.night[0]}, ${colorLayer2.night[1]}, ${colorLayer2.night[2]})`);
      gradient.addColorStop(0.2, `rgb(${colorLayer3.night[0]}, ${colorLayer3.night[1]}, ${colorLayer3.night[2]})`);
      gradient.addColorStop(0.4, `rgb(${colorLayer4.night[0]}, ${colorLayer4.night[1]}, ${colorLayer4.night[2]})`);
      background = `rgb(${colorLayer4.night[0]}, ${colorLayer4.night[1]}, ${colorLayer4.night[2]})`;
    }
    
    ctx.beginPath();
    ctx.arc(cursorLoc.x, cursorLoc.y, 1.5*windowSize.width, 0, 2*Math.PI)
    ctx.fillStyle = gradient;
    ctx.fill();
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
      <Canvas ref={canvasRef} />
      <Img1 src={Mountains1} />
      <Img2 src={Mountains2} />
    </>
  )
}

export default Projects

const Canvas = styled.canvas`
  position: fixed;
`

const Img1 = styled.img`
  position: fixed;
  left: -5%;
  width: 60%;
  bottom: 0;
`

const Img2 = styled.img`
  position: fixed;
  left: 45%;
  width: 60%;
  bottom: 0;
`