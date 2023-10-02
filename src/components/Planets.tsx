import styled from 'styled-components';

import Planet from './Planet'

import Mercury from '../assets/mercury.jpg';
import Venus from '../assets/venus.jpg';
import Earth from '../assets/earth.jpeg';
import Mars from '../assets/mars.jpg';
import { useState } from 'react';

const Planets = () => {

  type PlanetItem = {
    name: string;
    icon: string;
    daylength: number;
    size: number;
    tilt: number;
    link: string;
    isClicked: number;
    color: string;
  };

  const [isClicked, setIsClicked] = useState<number[]>([0, 0, 0, 0]);

  const PlanetItemList:PlanetItem[] = [
    { name: 'About Me', icon: Mercury, daylength: 176, size: 0.38, tilt: 0.027, link: '/about_me', isClicked: isClicked[0], color: '#e2e2e2' },
    { name: 'Education', icon: Venus, daylength: 243, size: 0.95, tilt: 3, link: '/education', isClicked: isClicked[1], color: '#f0d08b' },
    { name: 'Experience', icon: Earth, daylength: 24, size: 1, tilt: 23.5, link: '/experience', isClicked: isClicked[2], color: '#287ab8' },
    { name: 'Projects', icon: Mars, daylength: 23.9, size: 0.53, tilt: 25, link: '/projects', isClicked: isClicked[3], color: '#c1440e' },
  ]

  const handleClicked = (planetNumber: number) => {
    if (planetNumber === 0) setIsClicked([1, 6, 6, 6]);
    if (planetNumber === 1) setIsClicked([5, 2, 6, 6]);
    if (planetNumber === 2) setIsClicked([5, 5, 3, 6]);
    if (planetNumber === 3) setIsClicked([5, 5, 5, 4]);
  }

  return(
    <Container>
      {
        PlanetItemList.map((e, i=0) => {
          return(
              <Planet
                name={e.name}
                icon={e.icon}
                daylength={e.daylength}
                size={e.size}
                tilt={e.tilt}
                link={e.link}
                planetNumber={i}
                handleClicked={handleClicked}
                clickType={isClicked[i]}
                color={e.color}
                key={i}
              />
          )
        })
      }
    </Container>
  )
}

export default Planets

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`