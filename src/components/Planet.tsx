import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import PlanetTitle from './PlanetTitle';
import Planet3D from './Planet3D';

interface PlanetProps {
  name: string;
  icon: string;
  daylength: number;
  size: number;
  tilt: number;
  link: string;
  planetNumber: number;
  handleClicked: Function;
  clickType: number;
  color: string;
}

const Planet = ({ name, icon, daylength, size, tilt, link, planetNumber, handleClicked, clickType, color }: PlanetProps) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false)

  const wasClicked = () => {
    handleClicked(planetNumber);
    setClicked(true)
  }

  const handleHover = () => {
    if (!clicked) setIsHovered(true);
  }

  const navigate = useNavigate();
  const delayLink = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(link)
    }, 5500);
  }

  return(
    <Group className={`move-${clickType}`}>
      { 
        isHovered ? (
          <PlanetTitle
            isvisible={isHovered}
            tilt={tilt}
          >
            {name}
          </PlanetTitle> 
        ) : (
          <div 
            style={{height: `${tilt + 43}px`}}
          />
        )
      }
      <Link to={'/'} onClick={(e) => delayLink(e)}>
        <Container
          onMouseEnter={() => handleHover()}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => wasClicked()}
        >
          <Planet3D
            icon={icon}
            size={size}
            tilt={tilt}
            className={isHovered ? 'hovered' : 'not-hovered'}
            daylength={daylength}
            color={color}
          />
        </Container>
      </Link>
    </Group>
  )
}

export default Planet

const centerMercury = keyframes`
  50% {
    transform: translate3d(37.5vw, 0, 0);
  }
  100% {
    transform: translate3d(37.5vw, 110vh, 0) scale(50, 50);
  }
`

const centerVenus = keyframes`
  50% {
    transform: translate3d(13vw, 0, 0);
  }
  100% {
    transform: translate3d(13vw, 200vh, 0) scale(25, 25);
  }
`

const centerEarth = keyframes`
  50% {
    transform: translate3d(-13vw, 0, 0);
  }
  100% {
    transform: translate3d(-13vw, 210vh, 0) scale(25, 25);
  }
`

const centerMars = keyframes`
  50% {
    transform: translate3d(-38.5vw, 0, 0);
  }
  100% {
    transform: translate3d(-38.5vw, 130vh, 0) scale(40, 40);
  }
`

const moveLeft = keyframes`
  100% {
    transform: translateX(-75vw);
  }
`

const moveRight = keyframes`
  100% {
    transform: translateX(75vw);
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  &.move-1 {
  animation-duration: 5s;
    animation-name: ${centerMercury};
  }
  &.move-2 {
  animation-duration: 5s;
    animation-name: ${centerVenus};
  }
  &.move-3 {
  animation-duration: 5s;
    animation-name: ${centerEarth};
  }
  &.move-4 {
  animation-duration: 5s;
    animation-name: ${centerMars};
  }
  &.move-5 {
  animation-duration: 2s;
    animation-name: ${moveLeft};
  }
  &.move-6 {
  animation-duration: 2s;
    animation-name: ${moveRight};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`