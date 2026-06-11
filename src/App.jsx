// src/App.jsx

import Header from './ui/Header';
import Hero from './ui/Hero';
import TourList from './ui/TourList';
import TourCard from './ui/TourCard';
import Gallery from './ui/Gallery';
import Footer from './ui/Footer';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Hero />
      
      {/* This pushes the footer to the bottom if the page content is short */}
      <div className="flex-grow-1">
        <TourList />
      </div>
     <Gallery />
      <Footer /> {/* Place it at the very bottom */}
 
    </div>
  );
}

export default App;