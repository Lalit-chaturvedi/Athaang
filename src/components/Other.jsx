import { useEffect, useRef, useState } from 'react';

function useTestiCanvas(ref) {
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;
    function resize() { canvas.width=canvas.offsetWidth||window.innerWidth; canvas.height=canvas.offsetHeight||600; }
    resize(); window.addEventListener('resize', resize);
    const W2 = [
      {relY:.38,amp:18,freq:.46,spd:.0005,ph:0,  col:'rgba(107,158,143,0.14)'},
      {relY:.56,amp:14,freq:.58,spd:.0007,ph:1.5, col:'rgba(107,158,143,0.10)'},
      {relY:.72,amp:22,freq:.42,spd:.0004,ph:2.8, col:'rgba(61,107,94,0.08)'},
      {relY:.86,amp:10,freq:.66,spd:.0008,ph:.7,  col:'rgba(184,216,208,0.12)'},
    ];
    let T=0;
    function draw() {
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      W2.forEach(w => {
        const by=H*w.relY; ctx.beginPath(); ctx.moveTo(0,by);
        for(let x=0;x<=W;x+=4){const nx=x/W;const y=by+Math.sin(nx*Math.PI*2*w.freq+T*w.spd*60+w.ph)*w.amp+Math.sin(nx*Math.PI*2*w.freq*1.55+T*w.spd*40+w.ph+1)*w.amp*.25;ctx.lineTo(x,y);}
        ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=w.col;ctx.fill();
      });
      T++; id=requestAnimationFrame(draw);
    }
    draw();
    return () => { window.removeEventListener('resize',resize); cancelAnimationFrame(id); };
  }, [ref]);
}

const testimonials = [
  { text:"Working with Athaang felt like learning to breathe again. I came in drowning in anxiety and left feeling like myself — for the first time in years.", author:"— Priya M." },
  { text:"There's a rare quality of presence in Athaang's sessions. I never felt judged. I always felt held. Therapy became something I genuinely looked forward to.", author:"— Arjun K." },
  { text:"Grief made my world very small. Athaang helped me find colour in it again — gently, slowly, beautifully. I'm forever grateful.", author:"— Nisha T." },
];

export function Testimonials() {
  const ref = useRef(null);
  useTestiCanvas(ref);
  return (
    <section className="testi" id="testimonials">
      <canvas ref={ref} className="testi-canvas" />
      <div className="slabel">Voices</div>
      <h2 className="stitle">Words from those who've<br /><em>walked this path</em></h2>
      <div className="tgrid">
        {testimonials.map((t, i) => (
          <div className="tcard rev" key={i}>
            <div className="qm">"</div>
            <p>{t.text}</p>
            <div className="author">{t.author}</div>
            <div className="stars">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q:'What happens in a first session?', a:"The first session is simply a conversation. We get to know each other, I understand what brings you here, and together we explore whether this feels like the right fit. No pressure — ever." },
  { q:'How long does therapy take?',       a:"It depends entirely on you. Some find clarity in a few months; deeper transformations can take longer. We go at your pace — not a prescribed one." },
  { q:'Do you offer online sessions?',     a:"Yes — all sessions are available online via a secure, encrypted platform. In-person sessions in Pune are also available on select days." },
  { q:'Is everything kept confidential?',  a:"Absolutely. Everything shared stays in our sessions. Confidentiality is foundational — and legally protected." },
  { q:'What are your fees?',               a:"I offer a sliding scale to make therapy accessible. Please reach out and we'll find something that works for you — no one should choose between wellbeing and budget." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        {q} <span className={`faq-tog${open ? ' open' : ''}`}>+</span>
      </button>
      <div className={`faq-a${open ? ' open' : ''}`}>{a}</div>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section cnt-bg" id="contact">
      <div className="slabel">Reach Out</div>
      <h2 className="stitle">Ready to begin<br /><em>your journey?</em></h2>
      <div className="cnt-grid">
        <div className="rev-l">
          <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.48rem',color:'var(--deep)',marginBottom:'26px'}}>Common questions</h3>
          {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
        <div className="rev-r">
          <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.48rem',color:'var(--deep)',marginBottom:'26px'}}>Send a message</h3>
          <div className="cform">
            <div className="fg"><label>Your name</label><input type="text" placeholder="What shall I call you?" /></div>
            <div className="fg"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
            <div className="fg">
              <label>What are you seeking support for?</label>
              <select>
                <option value="">Choose an area...</option>
                <option>Anxiety or stress</option><option>Grief or loss</option>
                <option>Trauma healing</option><option>Relationship patterns</option>
                <option>General wellbeing</option><option>Not sure yet</option>
              </select>
            </div>
            <div className="fg"><label>Anything you'd like to share</label><textarea placeholder="There's no right or wrong thing to say here..." /></div>
            <button className="fsub" onClick={() => { setSent(true); setTimeout(() => setSent(false), 3200); }}
              style={sent ? {background:'var(--sage)'} : {}}>
              {sent ? 'Message sent 🌊' : 'Send with care →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <svg className="fwave" viewBox="0 0 1440 68" preserveAspectRatio="none" fill="none">
        <path d="M0,34 C200,62 400,6 600,34 C800,62 1000,6 1200,34 C1360,56 1410,16 1440,34 L1440,0 L0,0Z" fill="#f0f7f5"/>
        <path d="M0,50 C260,78 520,16 780,50 C1040,78 1260,20 1440,50 L1440,68 L0,68Z" fill="#0e1e1a"/>
      </svg>
      <div className="foot-in">
        <div className="fbrand">
          <span className="fname">Athaang</span>
          <p>A gentle, watery sanctuary for healing, growth, and returning home to yourself.</p>
        </div>
        <div className="fcol">
          <h5>Navigate</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>Connect</h5>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="mailto:hello@athaang.com">hello@athaang.com</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <p>© 2025 Athaang. All rights reserved.</p>
        <p style={{fontFamily:"'Caveat',cursive",fontSize:'.9rem',color:'#a8c5bc',opacity:'.42'}}>made with 🌊 and care</p>
      </div>
    </footer>
  );
}
