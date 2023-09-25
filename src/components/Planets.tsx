import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    dayLength: number;
    size: number;
    tilt: number;
    link: string;
    isClicked: boolean;
  };

  const [isClicked, setIsClicked] = useState<boolean[]>([false, false, false, false]);

  const PlanetItemList:PlanetItem[] = [
    { name: 'Mercury', icon: Mercury, dayLength: 176, size: 0.38, tilt: 0.027, link: '/about_me', isClicked: isClicked[0] },
    { name: 'Venus', icon: Venus, dayLength: 243, size: 0.95, tilt: 3, link: '/education', isClicked: isClicked[1] },
    { name: 'Earth', icon: Earth, dayLength: 24, size: 1, tilt: 23.5, link: '/experience', isClicked: isClicked[2] },
    { name: 'Mars', icon: Mars, dayLength: 23.9, size: 0.53, tilt: 25, link: '/projects', isClicked: isClicked[3] },
  ]

  const handleClicked = (planetNumber: number) => {
    const updateIsClicked = [...isClicked];
    updateIsClicked[planetNumber] = !updateIsClicked[planetNumber];
    setIsClicked(updateIsClicked);
  }

  return(
    <Container>
      {
        PlanetItemList.map((e, i=0) => {
          return(
              <Planet
                name={e.name}
                icon={e.icon}
                dayLength={e.dayLength}
                size={e.size}
                tilt={e.tilt}
                className={e.isClicked ? `clicked` : ''}
                planetNumber={i}
                handleClicked={handleClicked}
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`