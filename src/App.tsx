import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
   <div className="bg-black text-white font-sans antialiased overflow-x-hidden">
      <Navigation />
      <Hero />
      <Introduction />
      <Projects />
      <About />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
