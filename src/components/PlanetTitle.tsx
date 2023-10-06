import styled from "styled-components"

interface PlanetTitleProps {
  children: any;
  isvisible: boolean;
  tilt: number;
}

interface TitleProps {
  tilt: number;
}

const PlanetTitle = ({ children, isvisible, tilt}: PlanetTitleProps) => {

  return(
    <>
      { isvisible && <Title tilt={tilt}>{children}</Title> }
    </>
  )
}

export default PlanetTitle

const Title = styled.h2<TitleProps>`
  color: white;
  margin: 0;
  padding: 0;
  margin-bottom: ${props => `${props.tilt + 15}px`};
  font-family: Arial, sans-serif;
  font-size: 25px;
  display: inline-block;
  overflow: hidden;
  border-right: 0.15em solid transparent;
  border-left: 0.15em solid transparent;
  white-space: nowrap;
  letter-spacing: .1em;
  user-select: none;
  pointer-events: none;
  color: transparent;
  animation: 
    typing-h2 1s steps(20, end) forwards,
    blink-caret-h2 0.5s step-end 2;

  @keyframes typing-h2 {
    from {
      color: white;
      width: 0
    }
    to {
      color: white;
      width: 65%
    }
  }

  @keyframes blink-caret-h2 {
    0% {
      border-right-color: transparent
    }
    50% {
      border-right-color: white;
    }
  }
`