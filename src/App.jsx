// src/App.jsx
import Header from './components/Header';
import Hero from './components/Hero';
import TourList from './components/TourList';
import Gallery from './components/Gallery';
import Footer from './components/Footer'; // Import the new Footer


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