import './index.css';
import { useEffect, useRef } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Cal1, Cal2, Cal3, Cal4, Cal5 } from './components/Calligraphy';
import { About, Services, Approach } from './components/Sections';
import { Testimonials, Contact, Footer } from './components/Other';
import { useScrollReveal, useCalligraphyDraw, useCursor } from './hooks/useEffects';

function Cursor() {
  return (
    <>
      <div className="cur" />
      <div className="cur2" />
    </>
  );
}

export default function App() {
  useScrollReveal();
  useCalligraphyDraw();
  useCursor();

  // Seagrass injection for approach section
  const sgRef = useRef(null);
  useEffect(() => {
    const sg = document.getElementById('sg-target');
    if (!sg || sg.children.length > 0) return;
    for (let i = 0; i < 28; i++) {
      const bl = document.createElement('div');
      bl.className = 'gblade';
      const h = 28 + Math.random() * 65, dur = 5 + Math.random() * 4, del = Math.random() * 5;
      bl.style.cssText = `width:${2+Math.random()*2}px;height:${h}px;left:${Math.random()*100}%;opacity:${.07+Math.random()*.16};animation:sway ${dur}s ease-in-out ${del}s infinite alternate;`;
      sg.appendChild(bl);
    }
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Cal1 />
      <About />
      <Cal2 />
      <Services />
      <Cal3 />
      <div style={{position:'relative'}}>
        <div id="sg-target" className="sg-wrap" />
        <Approach />
      </div>
      <Cal4 />
      <Testimonials />
      <Cal5 />
      <Contact />
      <Footer />
    </>
  );
}
