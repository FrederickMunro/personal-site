import styled from "styled-components";


interface PlanetProps {
  icon: string;
  size: number;
  tilt: number;
  className: string;
  daylength: number;
  color: string;
}

const Planet3D = ({ icon, size, tilt, className, daylength, color }: PlanetProps) => {


  return(
    <Planet icon={icon} size={250*size} tilt={tilt} className={className} daylength={daylength} color={color}>

    </Planet>
  )
}

export default Planet3D

const Planet = styled.div<PlanetProps>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-image: url(${props => props.icon});
  box-shadow:
    inset ${props => `-${props.size/8}px`} ${props => `${(props.tilt)/2.5}px`} ${props => `${props.size/10}px`} #000,
    ${props => `-${props.size/40}px`} ${props => `${(props.tilt)/10}px`} 10px ${props => props.color};
  position: relative;
  animation: ${props => props.daylength===243 ? 'rotate-venus' : 'rotate'} ${props => `${props.daylength}s`} linear infinite;
  transform: skew(-${props => props.tilt}deg, ${props => props.tilt}deg);
  border-radius: 50%;
  background-repeat: repeat;
  background-size: 200% 100%;
  &.hovered:hover {
    transform: scale(1.1) skew(-${props => props.tilt}deg, ${props => props.tilt}deg);
  }

  @keyframes rotate {
    to {
      background-position: -200% 0;
    }
  }

  @keyframes rotate-venus {
    to {
      background-position: 200% 0;
    }
  }
`