import React from "react";
import Posts from './PostsAPI'
import Pokemon from './PokemonAPI'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'element={<Pokemon/>}/>
        <Route path='/post'element={<Posts/>}/>
      </Routes>
    </Router>
    </>
  )
}
export default App