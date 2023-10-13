import Planets from "./Planets";
import PageTitle from "./PageTitle";
import ShootingStars from "./ShootingStars";

const Body = () => {

  return(
    <>
      <ShootingStars />
      <PageTitle className={'name'}>Frederick Munro</PageTitle>
      <PageTitle className={'title'}>Software Engineer</PageTitle>
      <Planets />
    </>
  )
}

export default Body