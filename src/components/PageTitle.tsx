import styled from "styled-components"

const PageTitle = ({ children }: any) => {

  return(
    <Container>
      <Title>{children}</Title>
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
  font-size: 40px;
  color: white;
  display: inline-block;
  overflow: hidden;
  border-right: 0.15em solid white;
  border-left: 0.15em solid transparent;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .3em;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;

  @keyframes typing {
    from {
      width: 0
    }
    to {
      width: 100%
    }
  }

  @keyframes blink-caret {
    0% { border-right-color: transparent }
    50% { border-right-color: white; }
  }
`