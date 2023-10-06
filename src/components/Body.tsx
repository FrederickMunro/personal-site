import Planets from "./Planets";
import PageTitle from "./PageTitle";
import ShootingStars from "./ShootingStars";
import StaticStars from "./StaticStars";
import WindowContainer from "./WindowContainer";

const Body = () => {

  return(
    <WindowContainer color={'black'}>
      <StaticStars />
      <ShootingStars />
      <PageTitle className={'name'}>Frederick Munro</PageTitle>
      <PageTitle className={'title'}>Software Engineer</PageTitle>
      <Planets />
    </WindowContainer>
  )
}

export default Body