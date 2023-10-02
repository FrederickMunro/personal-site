import styled from "styled-components";

import Mercury from '../assets/mercury_orbit.jpg';

const AboutMe = () => {

  return(
    <Container>
    </Container>
  )
}

export default AboutMe

const Container = styled.div`
  background-image: url(${Mercury});
  width: 100%;
  height: 100%;
  background-size: cover;
  position: fixed;
  display: flex;
  flex-direction: column;
`