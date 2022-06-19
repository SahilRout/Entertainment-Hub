import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import Search from './pages/Search';
function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route exact path='/' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<TvSeries />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <Navbar />
    </Router>
  );
}

export default App;
