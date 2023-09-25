import { useState } from 'react';

import styled from 'styled-components';

interface PlanetProps {
  name:string;
  icon:string;
  dayLength: number;
  size: number;
  tilt: number;
  className: string;
  planetNumber: number;
  handleClicked: Function;
}

interface ImageProps {
  icon: string;
  dayLength: number;
  size: number;
}

interface ContainerProps {
  size: number;
}

interface PlanetContainerProps {
  tilt: number;
}

const Planet = ({ name, icon, dayLength, size, tilt, className, planetNumber, handleClicked }: PlanetProps) => {

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(true);
    console.log('clicked');
  }

  return(
    <Container size={250*size} >
      <PlanetContainer tilt={tilt} className={className} onClick={() => handleClicked(planetNumber)}>
        <Image icon={icon} dayLength={dayLength} size={400*size} />
      </PlanetContainer>
    </Container>
  )
}

export default Planet

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  .clicked {
    animation: zoomIn 2s ease-in forwards;

    @keyframes zoomIn {
      100% {
        transform: scale(10, 10);
      }
    }
  }
`

const PlanetContainer = styled.div<PlanetContainerProps>`
  cursor: pointer;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  filter: drop-shadow(2px 2px 2px rgb(0 0 0 / 0.2));
  transform: skew(-${props => props.tilt}deg, ${props => props.tilt}deg);
  overflow: hidden;
  transition: all .2s ease-in-out 0s;
  &:hover {
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
  
  animation: rotate ${props => props.dayLength}s linear 0s infinite;

  @keyframes rotate {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(66.666666%, 0, 0);
    }
  }
`