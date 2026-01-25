import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Popular from './Components/Popular'
import Movies from './Components/Movies'
import TvShows from './components/TvShows.jsx'
import People from './Components/People'
import Trendings from './Components/Trendings'
import About from './Components/About'
import Contact from './Components/Contact'
import Explore from './Components/Explore'

const App = () => {
  return (
    <div className='h-screen w-screen bg-[#1F1E24] flex'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore' element={<Explore/>} />
        <Route path='/trendings' element={<Trendings/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/tvshows' element={<TvShows/>} />
        <Route path='/people' element={<People/>} />
        <Route path='/aboutus' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </div>
  )
}

export default App