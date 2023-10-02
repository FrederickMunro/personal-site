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
  font-size: 50px;
  color: transparent;
  display: inline-block;
  overflow: hidden;
  border-right: 0.15em solid transparent;
  border-left: 0.15em solid transparent;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .2em;
  user-select: none;
  pointer-events: none;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;

  
  &.title {
    margin-top: 60px;
    margin-left: 10px;
    font-size: 40px;
    animation: 
      typing 3s steps(40, end) 3.5s forwards,
      blink-caret 0.75s step-end 3.5s 4;

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
  
  &.name {
    animation: 
    typing 3.5s steps(40, end) forwards,
    blink-caret 0.75s step-end 4;

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

`