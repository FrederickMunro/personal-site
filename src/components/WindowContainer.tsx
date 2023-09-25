import styled from "styled-components"

interface Props {
  color?: string;
  children: any;
}

const WindowContainer = ({ color='transparent', children }: Props) => {

  return(
    <Container color={color}>
      {children}
    </Container>
  )
}

export default WindowContainer

const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${props => props.color}
`