import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const blockPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    const blockGesture = (e: Event) => e.preventDefault();

    document.addEventListener('touchmove', blockPinch, { passive: false });
    document.addEventListener('gesturestart', blockGesture);
    document.addEventListener('gesturechange', blockGesture);

    return () => {
      document.removeEventListener('touchmove', blockPinch);
      document.removeEventListener('gesturestart', blockGesture);
      document.removeEventListener('gesturechange', blockGesture);
    };
  }, []);

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