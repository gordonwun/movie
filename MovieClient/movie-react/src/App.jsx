import { useState, useEffect } from 'react'
import './App.css'
import api from './api/axiosConfig'
import { Layout } from './Components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home'
import Header from './Components/header/Header'
import Trailer from './Components/trailer/Trailer'

function App() {

  const [movies, setMovies] = useState()

  const getMovies = async () => {
    try {

      const response = await api.get("/api/v1/movies")

      console.log(response.data)
      
      setMovies(response.data)
    } 
    catch (error) {
      console.log(error)
    }
      
  }

  useEffect(() => {
    getMovies()
  },[])

  return (
    <>
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home movies={movies}/>}/>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}/>
        </Route>
      </Routes>

    </div>
    </>
  )
}

export default App
