import ShootingStars from "./ShootingStars";
import Planets from "./Planets";
import CursorStar from "./CursorStar";
import StaticStars from "./StaticStars";
import WindowContainer from "./WindowContainer";
import PageTitle from "./PageTitle";

const Body = () => {

  return(
    <WindowContainer color={'black'}>
      <PageTitle className={'name'}>Frederick Munro</PageTitle>
      <PageTitle className={'title'}>Web Developer</PageTitle>
      <StaticStars />
      <ShootingStars />
      <Planets />
    </WindowContainer>
  )
}

export default Body