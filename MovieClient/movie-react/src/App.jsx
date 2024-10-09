import { useState, useEffect } from 'react'
import './App.css'
import api from './api/axiosConfig'
import { Layout } from './Components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home'
import Header from './Components/header/Header'
import Trailer from './Components/trailer/Trailer'
import Reviews from './Components/reviews/Reviews'

function App() {

  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState()

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

  const getSingleMovie = async (movieId) => {
    const response = await api.get(`/api/v1/movies/Imdbid/${movieId}`)
    const movie = response.data
    setMovie(movie)
    setReviews(movie.reviewsIds)
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
          <Route path='/Reviews/:movieId' element={<Reviews 
                                                      getMovieData={getSingleMovie}
                                                      movie={movie}
                                                      reviews={reviews}
                                                      setReviews={setReviews}
                                                    />}/>
        </Route>
      </Routes>

    </div>
    </>
  )
}

export default App
