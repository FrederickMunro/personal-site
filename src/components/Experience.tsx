import styled, { keyframes } from "styled-components";

import Mountains1 from '../assets/m1.png';
import Mountains2 from '../assets/m2.png';
import Mountains3 from '../assets/m3.png';
import Mountains4 from '../assets/m4.png';

import { useRef, useState, useEffect } from "react";

interface Dimensions {
  height: number;
  width: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface ExperienceProps {
  cursor: Coordinates;
  windowSize: Dimensions;
}

interface Star {
  x: number;
  y: number;
  size: number;
}

interface ColorLayer {
  one: number[];
  two: number[];
  three: number[];
  four: number[];
}

interface TextColor {
  color: boolean;
}

interface Page {
  page: number;
}


const Experience = ({ cursor, windowSize }: ExperienceProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const starLocations: Star[] = [];
  for (let i = 0; i < 100; i++) {
    starLocations.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.ceil(Math.random()*3),
    })
  }
  const [starLocs, setStarLocs] = useState<Star[]>(starLocations);

  const [page, setPage] = useState<number>(0);

  const handlePageLeft = () => {
    setPage(page-1);
  }
  const handlePageRight = () => {
    setPage(page+1)
  }

  const cutoff = {
    day: 0.2,
    sunset: 0.05,
    evening: 0.02,
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

  const setGradient = (gradient: CanvasGradient, time: string) => {
    let intensityFactor: number,
        topColor: ColorLayer,
        bottomColor: ColorLayer;
    if (time === 'day') {
      intensityFactor = (1-cursor.y/windowSize.height - cutoff.day) / (1 - cutoff.day);
      topColor = {
        one: colorLayer1.day,
        two: colorLayer2.day,
        three: colorLayer3.day,
        four: colorLayer4.day,
      };
      bottomColor = {
        one: colorLayer1.sunset,
        two: colorLayer2.sunset,
        three: colorLayer3.sunset,
        four: colorLayer4.sunset,
      }
    } else if (time === 'sunset') {
      intensityFactor = (1-cursor.y/windowSize.height - cutoff.sunset) / (cutoff.day - cutoff.sunset);
      topColor = {
        one: colorLayer1.sunset,
        two: colorLayer2.sunset,
        three: colorLayer3.sunset,
        four: colorLayer4.sunset,
      };
      bottomColor = {
        one: colorLayer1.evening,
        two: colorLayer2.evening,
        three: colorLayer3.evening,
        four: colorLayer4.evening,
      }
    } else if (time === 'evening') {
      intensityFactor = (1-cursor.y/windowSize.height - cutoff.evening) / (cutoff.sunset - cutoff.evening);
      topColor = {
        one: colorLayer1.evening,
        two: colorLayer2.evening,
        three: colorLayer3.evening,
        four: colorLayer4.evening,
      };
      bottomColor = {
        one: colorLayer1.night,
        two: colorLayer2.night,
        three: colorLayer3.night,
        four: colorLayer4.night,
      }
    } else {
      intensityFactor = 0;
      topColor = bottomColor = {
        one: colorLayer1.night,
        two: colorLayer2.night,
        three: colorLayer3.night,
        four: colorLayer4.night,
      };
    }
    const layer1 = lerpColor(bottomColor.one, topColor.one, intensityFactor),
          layer2 = lerpColor(bottomColor.two, topColor.two, intensityFactor),
          layer3 = lerpColor(bottomColor.three, topColor.three, intensityFactor),
          layer4 = lerpColor(bottomColor.four, topColor.four, intensityFactor);
    gradient.addColorStop(0.03, `rgb(${layer1[0]}, ${layer1[1]}, ${layer1[2]})`);
    gradient.addColorStop(0.075, `rgb(${layer2[0]}, ${layer2[1]}, ${layer2[2]})`);
    gradient.addColorStop(0.2, `rgb(${layer3[0]}, ${layer3[1]}, ${layer3[2]})`);
    gradient.addColorStop(0.4, `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`);
    return `rgb(${layer4[0]}, ${layer4[1]}, ${layer4[2]})`;
  }

  const drawSun = (ctx: CanvasRenderingContext2D, gradient: CanvasGradient) => {
    ctx.beginPath();
    ctx.arc(
      cursor.x,
      cursor.y,
      1.5*windowSize.width,
      0,
      2*Math.PI
    );
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
  }

  const drawMoon = (ctx: CanvasRenderingContext2D) => {
    const center: Coordinates = {
            x: windowSize.width / 2,
            y: windowSize.height / 2,
          },
          xradius = windowSize.width / 2,
          yradius = windowSize.height / 2.5,
          angle = Math.atan2(cursor.y - center.y, cursor.x - center.x);
    const moon: Coordinates = {
      x: center.x + xradius * Math.cos(angle),
      y: center.y - yradius * Math.sin(angle),
    };
    const opacityFactor = (1-cursor.y/windowSize.height - cutoff.evening) / (cutoff.sunset - cutoff.evening);
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
      moon.x,
      moon.y,
      100,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = `rgba(246, 241, 213, ${1 - opacityFactor}`;
    ctx.fill();
    ctx.closePath();
  }

  const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
    const opacityFactor = (1-cursor.y/windowSize.height - cutoff.night) / (cutoff.evening - cutoff.night);
    ctx.shadowColor = 'white';
    ctx.shadowBlur=10;
    ctx.beginPath();
    ctx.arc(
      star.x * windowSize.width,
      star.y * (windowSize.height - windowSize.height/5),
      star.size,
      0,
      2*Math.PI,
    );
    ctx.fillStyle = `rgba(240, 240, 240, ${1 - opacityFactor}`;
    ctx.fill();
    ctx.closePath();
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
      cursor.x,
      cursor.y,
      0,
      cursor.x,
      cursor.y,
      windowSize.width > windowSize.height ? 1.1*windowSize.width : 1.1*windowSize.height
    );
    let background = 'transparent';
    let isNight = false;
    if (cursor.y < windowSize.height-windowSize.height*cutoff.day)
      background = setGradient(gradient, 'day');
    else if (cursor.y < windowSize.height-windowSize.height*cutoff.sunset && cursor.y >= windowSize.height-windowSize.height*cutoff.day)
      background = setGradient(gradient, 'sunset');
    else if (cursor.y < windowSize.height-windowSize.height*cutoff.evening && cursor.y >= windowSize.height-windowSize.height*cutoff.sunset) {
      background = setGradient(gradient, 'evening');
      isNight = true;
    } else {
      background = setGradient(gradient, 'night');
      isNight = true;
    }
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, windowSize.width, windowSize.height);
    drawSun(ctx, gradient)
    if (isNight) {
      drawMoon(ctx);
      for (const star of starLocs) {
        drawStar(ctx, star)
      }
    }
  }, [windowSize, cursor])

  return(
    <Container>
      <Canvas ref={canvasRef} />
      <Img1
        src={Mountains1}
        x={cursor.x}
        y={cursor.y}
        height={windowSize.height}
        width={windowSize.height}
      />
      <Img2
        src={Mountains2}
        x={cursor.x}
        y={cursor.y}
        height={windowSize.height}
        width={windowSize.height}
      />
      <Img3
        src={Mountains3}
        x={cursor.x}
        y={cursor.y}
        height={windowSize.height}
        width={windowSize.height}
      />
      <Img4
        src={Mountains4}
        x={cursor.x}
        y={cursor.y}
        height={windowSize.height}
        width={windowSize.height}
      />
      <ButtonContainer>
        <LeftButton color={cursor.y > windowSize.height-windowSize.height*cutoff.sunset} page={page} onClick={() => handlePageLeft()} >{'<'}</LeftButton>
      </ButtonContainer>
      <ButtonContainer>
        <RightButton color={cursor.y > windowSize.height-windowSize.height*cutoff.sunset} page={page} onClick={() => handlePageRight()}>{'>'}</RightButton>
      </ButtonContainer>
      <VisibleContainer>
        <TextBoxContainer page={page}>
          <TextBox color={cursor.y > windowSize.height-windowSize.height*cutoff.sunset}>
            <Company>Staffbase | Junior Software Engineer</Company>
            <Date>May 2022 - May 2023</Date>
            <Tasks>
              <Task>
                <p>Implemented improvements and fixes to enhance the functionalities of a collaborative email creation tool within the web application.</p>
              </Task>
              <Task>
                <p>Contributed to enhancing the scalability of the UI library by modifying components to make them more reusable.</p>
              </Task>
              <Task>
                <p>Improved the technical onboarding process by refining and creating onboarding documentation.</p>
              </Task>
              <Task>
                <p>Reviewed peers' code modifications and either approved or suggested enhancements to these modifications.</p>
              </Task>
              <Task>
                <p>Contributed to the modernization of the code base by updating components to match company practices.</p>
              </Task>
            </Tasks>
          </TextBox>
          <TextBox color={cursor.y > windowSize.height-windowSize.height*cutoff.sunset}>
            <Company>Humance | IT Technician</Company>
            <Date>May 2020 - May 2022</Date>
            <Tasks>
              <Task>
                <p>Prepared comprehensive documentation for software processes and hardware technologies.</p>
              </Task>
              <Task>
                <p>Contributed to the modernization of the IT infrastructure by facilitating the transition to a cloud-based environment.</p>
              </Task>
              <Task>
                <p>Assisted in the technical onboarding process for new employees.</p>
              </Task>
              <Task>
                <p>Offered technical support to address and resolve technical issues.</p>
              </Task>
            </Tasks>
          </TextBox>
          <TextBox color={cursor.y > windowSize.height-windowSize.height*cutoff.sunset}>
            <Company>Walmart Canada | Customer Service Associate</Company>
            <Date>Sept 2015 - May 2020</Date>
            <Tasks>
              <Task>
                <p>Provided individual training sessions for 15 employees.</p>
              </Task>
              <Task>
                <p>Successfully managed inventory to ensure proper tracking and availability of resources.</p>
              </Task>
              <Task>
                <p>Created a streamlined cleaning plan to simplify and improve sanitation procedures.</p>
              </Task>
            </Tasks>
          </TextBox>
        </TextBoxContainer>
      </VisibleContainer>
    </Container>
  )
}

export default Experience

const frameIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  animation: ${frameIn} 1s linear forwards;
`

const Canvas = styled.canvas`
  position: fixed;
`

const Img1 = styled.img.attrs<Coordinates & Dimensions>(props => ({
  style: {
    left: `${-1 - ((props.x / props.width))}%`,
  }
}))`
  pointer-events: none;
  position: fixed;
  height: 10%;
  width: 52%;
  bottom: 0;
`

const Img2 = styled.img.attrs<Coordinates & Dimensions>(props => ({
  style: {
    left: `${50.5 - (props.x / props.width)}%`,
  }
}))`
  pointer-events: none;
  position: fixed;
  height: 13%;
  width: 52%;
  bottom: 0;
`

const Img3 = styled.img.attrs<Coordinates & Dimensions>(props => ({
  style: {
    left: `${-1 - (props.x / props.width) * 5}%`,
  }
}))`
  pointer-events: none;
  position: fixed;
  height: 18%;
  width: 58%;
  bottom: 0;
  overflow: hidden;
  opacity: 0.8;
`

const Img4 = styled.img.attrs<Coordinates & Dimensions>(props => ({
  style: {
    left: `${57 - (props.x / props.width) * 5}%`,
  }
}))`
  pointer-events: none;
  position: fixed;
  height: 18%;
  width: 59%;
  bottom: 0;
  overflow: hidden;
  opacity: 0.8;
`

const VisibleContainer = styled.div`
  right: 100px;
  top: 40%;
  position: fixed;
  max-width: 40%;
  overflow: hidden;
`

const TextBoxContainer = styled.div<Page>`
  display: flex;
  transform: translateX(${props => -props.page * 100}%);
  transition: transform 0.5s ease;
`

const TextBox = styled.p<TextColor>`
  font-family: Arial, sans-serif;
  color: ${props => props.color ? 'white' : 'black'};
  min-width: 100%;
  pointer-events: none;
  overflow: auto;
`

const Company = styled.h2`
  font-size: 28px;
  margin: 0;
`

const Date = styled.h3`
  font-size: 16px;
  margin: 0 0 0 2px;
`

const Tasks = styled.ul`
  font-size: 18px;
  margin: 10px 0 0 -15px;
`

const Task = styled.li`
  margin: 0;
`

const ButtonContainer = styled.div`
  min-width: 100px;
`

const LeftButton = styled.button<TextColor & Page>`
  font-weight: bold;
  font-size: 45px;
  position: fixed;
  width: 60px;
  right: calc(40% + 120px);
  margin: 0 20px 0 20px;
  top: 48%;
  height: 60px;
  color: ${props => props.color ? 'white' : 'black'};
  display: ${props => props.page === 0 ? 'none' : 'visible'};
  background: none;
  border: none;
  cursor: pointer;
`

const RightButton = styled.button<TextColor & Page>`
  font-weight: bold;
  font-size: 45px;
  position: fixed;
  width: 60px;
  right: 20px;
  margin: 0 20px 0 20px;
  top: 48%;
  height: 60px;
  color: ${props => props.color ? 'white' : 'black'};
  display: ${props => props.page === 2 ? 'none' : 'visible'};
  background: none;
  border: none;
  cursor: pointer;
`