import styled from "styled-components"

const PageTitle = ({ children, className }: any) => {

  return(
    <Container>
      <Title className={className}>{children}</Title>
    </Container>
  )
}

export default PageTitle

const Container = styled.div`
  display: inline-block;
  position: fixed;
  padding: 1% 0 0 1%;
`

const Title = styled.h1`
  font-family: Arial, sans-serif;
  color: transparent;
  display: inline-block;
  overflow: hidden;
  border-right: 0.15em solid transparent;
  border-left: 0.15em solid transparent;
  white-space: nowrap;
  margin: 0 auto;
  user-select: none;
  pointer-events: none;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end 3;
  
  &.name {
    font-size: 60px;
    letter-spacing: .1em;
    animation: 
    typing 3s steps(40, end) forwards,
    blink-caret 0.6s step-end 4;

    @keyframes typing {
      from {
        color: white;
        width: 0
      }
      to {
        color: white;
        width: 100%
      }
    }

    @keyframes blink-caret {
      0% {
        border-right-color: transparent;
      }
      50% {
        border-right-color: white;
      }
    }
  }
  
  &.title {
    letter-spacing: .1em;
    margin-top: 65px;
    font-size: 45px;
    animation: 
      typing 2.5s steps(35, end) 3s forwards,
      blink-caret 0.6s step-end 3s 4;

    @keyframes typing {
      from {
        color: white;
        width: 0;
      }
      to {
        color: white;
        width: 100%;
      }
    }

    @keyframes blink-caret {
      0% {
        border-right-color: transparent;
      }
      50% {
        border-right-color: white;
      }
    }
  }
`