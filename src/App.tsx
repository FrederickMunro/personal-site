import { Route, Routes } from 'react-router-dom';

import Body from './components/Body';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Body /> } />
      <Route path='/about_me' element={ <AboutMe /> } />
      <Route path='/education' element={ <Education /> } />
      <Route path='/experience' element={ <Experience /> } />
      <Route path='/projects' element={ <Projects /> } />
    </Routes>
  )
}

export default App
