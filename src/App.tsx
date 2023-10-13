import { Route, Routes } from 'react-router-dom';

import Body from './components/Body';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import WindowContainer from './components/WindowContainer';
import StaticStars from './components/StaticStars';
import { useEffect, useState } from 'react';

interface Dimensions {
  height: number;
  width: number;
}

interface Coordinates {
  x: number;
  y: number;
}

function App() {

  const [windowSize, setWindowSize] = useState<Dimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const [cursor, setCursor] = useState<Coordinates>({
    x: 0,
    y: 0,
  })

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    setCursor({
      x: e.clientX,
      y: e.clientY,
    })
  }

  
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])

  return (
    <WindowContainer color={'black'}>
      <StaticStars />
      <Routes>
        <Route path='/' element={ <Body /> } />
        <Route path='/about_me' element={ <AboutMe /> } />
        <Route path='/education' element={ <Education /> } />
        <Route path='/experience' element={ <Experience cursor={cursor} windowSize={windowSize} /> } />
        <Route path='/projects' element={ <Projects cursor={cursor} windowSize={windowSize} /> } />
      </Routes>
    </WindowContainer>
  )
}

export default App
