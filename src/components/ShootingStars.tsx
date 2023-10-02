import { useState } from 'react';
import styled from 'styled-components';


interface StarProps {
  startx: number;
  endx: number;
  starty: number;
  endy: number;
  size: number;
  animid: number;
  animtime: number;
}

const ShootingStars = () => {

  const [starList, setStarList] = useState<JSX.Element[]>([])

  const generateStarDetails = () => {
    let r1 = Math.floor(Math.random()*2),
        r2 = Math.floor(Math.random()*2);

    return (r1 ? {
        startx: r2 ? 0 : 100,
        endx: r2 ? 100 : 0,
        starty: Math.random()*100,
        endy: Math.random()*100,
      } : {
        startx: Math.random()*100,
        endx: Math.random()*100,
        starty: r2 ? 0 : 100,
        endy: r2 ? 100 : 0,
      }
    )
  }

  const launchStar = () => {
    const { startx, endx, starty, endy } = generateStarDetails();
    const animid = Date.now(),
          animtime = Math.random()*4+1;

    const star =
      <Star
        startx={startx}
        endx={endx}
        starty={starty}
        endy={endy}
        size={Math.ceil(Math.random()*4)}
        animid={animid}
        animtime={animtime}
        key={Date.now()}
      />

    setStarList([...starList, star])

    setTimeout(() => setStarList((prevStars) => prevStars.filter((star) => star.key !== animid)), animtime*1000+1000);
  }

  return(
    <Container onClick={() => launchStar()}>
      { starList }
    </Container>
  )
}

export default ShootingStars

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
`

const Star = styled.div.attrs<StarProps>(({ size }) => ({
  style: {
    width: `${size}px`,
    height: `${size}px`,
  }
}))`
  background-color: #ffffff;
  position: fixed;
  border-radius: 50%;

  animation: ${props => `moveStar-${props.animid}`} ${props => `${props.animtime}s`} linear forwards;
  
  @keyframes ${props => `moveStar-${props.animid}`} {
    from {
      transform: translate3d(${props => `${props.startx}vw`}, ${props => `${props.starty}vh`}, 0);
    }
    to {
      transform: translate3d(${props => `${props.endx}vw`}, ${props => `${props.endy}vh`}, 0);
      display: none;
      visibility: hidden;
    }
  }
`