import styled from "styled-components";

import ShootingStars from "./ShootingStars";
import Planets from "./Planets";
import CursorStar from "./CursorStar";
import StaticStars from "./StaticStars";
import WindowContainer from "./WindowContainer";
import PageTitle from "./PageTitle";

import Willimer from '../assets/willimer.png';

const Body = () => {

  return(
    <WindowContainer color={'black'}>
      <PageTitle>Fred's Developer Site Welcome to Space</PageTitle>
      <Canvas></Canvas>
      <StaticStars />
      <ShootingStars />
      <Planets />
      <CursorStar />
    </WindowContainer>
  )
}

export default Body

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: fixed;
`