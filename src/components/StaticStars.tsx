import { useState, useEffect } from 'react';

import WindowContainer from './WindowContainer';
import styled from 'styled-components';


interface StarProps {
  left: number;
  top: number;
  size: number;
}

const StaticStars = () => {

  const [staticStars, setStaticStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const staticStarsArray = [...Array(300).keys()].map((e, i=0) => (
          <Star left={Math.random()*100} top={Math.random()*100} size={Math.ceil(Math.random()*5)} key={i++} />
    ));
    setStaticStars(staticStarsArray);
  }, []);

  return(
    <WindowContainer>
      {staticStars}
    </WindowContainer>
  )
}

export default StaticStars

const Star = styled.div.attrs<StarProps>(({ left, top, size}) => ({
  style: {
    left: `${left}vw`,
    top: `${top}vh`,
    width: `${size}px`,
    height: `${size}px`,
    boxShadow: `0px 0px ${size-1}px white`,
  },
}))`
  background-color: #ffffff;
  position: fixed;
  border-radius: 50%;
`