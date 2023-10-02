import { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import PlanetTitle from './PlanetTitle';
import { Link, useNavigate } from 'react-router-dom';

interface PlanetProps {
  name:string;
  icon:string;
  daylength: number;
  size: number;
  tilt: number;
  planetNumber: number;
  handleClicked: Function;
  clickType: number;
}

interface ImageProps {
  icon: string;
  daylength: number;
  size: number;
}

interface ContainerProps {
}

interface PlanetContainerProps {
  tilt: number;
  size: number;
}

const Planet = ({ name, icon, daylength, size, tilt, planetNumber, handleClicked, clickType }: PlanetProps) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false)

  const wasClicked = () => {
    handleClicked(planetNumber);
    setClicked(true)
  }

  const handleHover = () => {
    if (!clicked) setIsHovered(true);
  }

  const chooseLink = () => {
    if (name === 'About Me') return '/about_me'
    if (name === 'Education') return '/education'
    if (name === 'Experience') return '/experience'
    return '/projects'
  }

  const navigate = useNavigate();
  const delayLink = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(chooseLink())
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
          <PlanetContainer
            size={250*size}
            tilt={tilt}
            className={isHovered ? 'hovered' : 'not-hovered'}
          >
            <Image icon={icon} daylength={daylength} size={400*size} />
          </PlanetContainer>
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

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
`

const PlanetContainer = styled.div<PlanetContainerProps>`
  cursor: pointer;
  border-radius: 50%;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  filter: drop-shadow(2px 2px 2px rgb(0 0 0 / 0.2));
  transform: skew(-${props => props.tilt}deg, ${props => props.tilt}deg);
  overflow: hidden;
  transition: all .2s ease-in-out 0s;
  &.hovered:hover {
    transform: scale(1.1) skew(-${props => props.tilt}deg, ${props => props.tilt}deg);
  }
`

const Image = styled.div<ImageProps>`
  background: url(${props => props.icon});
  width: 300%;
  height: 100%;
  margin-left: -200%;
  background-size: contain;
  opacity: 1;
  
  animation: rotate ${props => props.daylength!}s linear 0s infinite;

  @keyframes rotate {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(66.666666%, 0, 0);
    }
  }
`