import { useEffect, useRef } from 'react';

function useBeachCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const SWELLS = [
      { relY:0.62, amp:18, freq:0.48, spd:0.0006, ph:0,   a:0.55, col:'#9ec8bc' },
      { relY:0.68, amp:14, freq:0.56, spd:0.0008, ph:1.3, a:0.60, col:'#aed4c8' },
      { relY:0.74, amp:20, freq:0.44, spd:0.0005, ph:2.6, a:0.65, col:'#bdddd4' },
      { relY:0.80, amp:12, freq:0.62, spd:0.0009, ph:0.9, a:0.72, col:'#cce6de' },
      { relY:0.86, amp:16, freq:0.52, spd:0.0007, ph:2.0, a:0.78, col:'#d8edea' },
      { relY:0.90, amp: 9, freq:0.70, spd:0.0010, ph:3.2, a:0.88, col:'#e4f2ef' },
    ];

    const WISPS = Array.from({ length: 12 }, () => ({
      x: Math.random(), relY: 0.895 + Math.random() * 0.04,
      w: 0.04 + Math.random() * 0.08, h: 0.004 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2, spd: 0.0004 + Math.random() * 0.0004,
      life: Math.random(), lifeSp: 0.0008 + Math.random() * 0.0008,
    }));

    function hexAlpha(hex, a) {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${Math.max(0,Math.min(1,a))})`;
    }

    let T = 0;
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.58);
      sky.addColorStop(0, '#d0e8f6'); sky.addColorStop(0.4, '#c4deef'); sky.addColorStop(1, '#b8d6eb');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.58);

      // Sun glow
      const sunX = W*0.76, sunY = H*0.18, sunR = Math.min(W,H)*0.065;
      const sunG = ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR*3.2);
      sunG.addColorStop(0,'rgba(255,240,190,0.55)'); sunG.addColorStop(0.35,'rgba(255,230,160,0.3)'); sunG.addColorStop(1,'rgba(255,230,160,0)');
      ctx.fillStyle=sunG; ctx.beginPath(); ctx.arc(sunX,sunY,sunR*3.2,0,Math.PI*2); ctx.fill();
      const sunCore = ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR);
      sunCore.addColorStop(0,'rgba(255,248,220,0.9)'); sunCore.addColorStop(1,'rgba(255,240,180,0.5)');
      ctx.fillStyle=sunCore; ctx.beginPath(); ctx.arc(sunX,sunY,sunR,0,Math.PI*2); ctx.fill();

      // Sun path shimmer
      const pathW=W*0.14;
      const pG=ctx.createLinearGradient(0,H*0.58,0,H*0.92);
      pG.addColorStop(0,'rgba(255,240,180,0.28)'); pG.addColorStop(0.6,'rgba(255,240,180,0.1)'); pG.addColorStop(1,'rgba(255,240,180,0)');
      ctx.fillStyle=pG;
      ctx.beginPath(); ctx.moveTo(sunX-pathW*0.3,H*0.58); ctx.quadraticCurveTo(sunX,H*0.72,sunX-pathW,H*0.92);
      ctx.lineTo(sunX+pathW,H*0.92); ctx.quadraticCurveTo(sunX,H*0.72,sunX+pathW*0.3,H*0.58); ctx.closePath(); ctx.fill();
      for(let i=0;i<6;i++){
        const fy=H*(0.60+i*0.045), fw=pathW*(0.3+i*0.12), fo=(0.3+0.1*Math.sin(T*0.03+i*1.1))*(1-i*0.1);
        ctx.fillStyle=`rgba(255,248,200,${fo})`; ctx.beginPath();
        ctx.ellipse(sunX+Math.sin(T*0.008+i)*fw*0.2,fy,fw*0.8,H*0.007,0,0,Math.PI*2); ctx.fill();
      }

      // Deep ocean
      const ocean=ctx.createLinearGradient(0,H*0.57,0,H*0.91);
      ocean.addColorStop(0,'#8bbdce'); ocean.addColorStop(0.3,'#9ac8cc'); ocean.addColorStop(0.65,'#aad5cc'); ocean.addColorStop(1,'#bee2d8');
      ctx.fillStyle=ocean; ctx.fillRect(0,H*0.57,W,H*0.91-H*0.57);

      // Swells
      SWELLS.forEach((sw,idx)=>{
        const by=H*sw.relY;
        ctx.beginPath(); ctx.moveTo(0,by);
        for(let x=0;x<=W;x+=3){
          const nx=x/W;
          const y=by+Math.sin(nx*Math.PI*2*sw.freq+T*sw.spd*60+sw.ph)*sw.amp+Math.sin(nx*Math.PI*2*sw.freq*1.62+T*sw.spd*42+sw.ph+1.1)*sw.amp*0.22;
          ctx.lineTo(x,y);
        }
        ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
        const g=ctx.createLinearGradient(0,by-sw.amp,0,H);
        g.addColorStop(0,hexAlpha(sw.col,sw.a-0.12)); g.addColorStop(0.4,hexAlpha(sw.col,sw.a)); g.addColorStop(1,hexAlpha(sw.col,sw.a+0.08));
        ctx.fillStyle=g; ctx.fill();
        if(idx>=3){
          ctx.beginPath(); ctx.moveTo(0,by);
          for(let x=0;x<=W;x+=3){
            const nx=x/W; const y=by+Math.sin(nx*Math.PI*2*sw.freq+T*sw.spd*60+sw.ph)*sw.amp+Math.sin(nx*Math.PI*2*sw.freq*1.62+T*sw.spd*42+sw.ph+1.1)*sw.amp*0.22;
            ctx.lineTo(x,y);
          }
          ctx.strokeStyle='rgba(255,255,255,0.32)'; ctx.lineWidth=1.5; ctx.stroke();
        }
      });

      // Foam wisps
      WISPS.forEach(w=>{
        w.life+=w.lifeSp; if(w.life>1){w.life=0;w.x=Math.random();}
        const lifeA=Math.sin(w.life*Math.PI)*0.55;
        const wx=w.x*W+Math.sin(T*w.spd*40+w.phase)*W*0.015;
        const wy=H*w.relY+Math.sin(T*w.spd*55+w.phase+1)*4;
        ctx.beginPath(); ctx.ellipse(wx,wy,w.w*W,w.h*H,0,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${lifeA})`; ctx.fill();
      });

      // Wet sand
      const wet=ctx.createLinearGradient(0,H*0.91,0,H*0.95);
      wet.addColorStop(0,'#ccddd8'); wet.addColorStop(1,'#d8e6e0');
      ctx.fillStyle=wet; ctx.beginPath(); ctx.moveTo(0,H*0.91);
      const sw6=SWELLS[5];
      for(let x=0;x<=W;x+=4){
        const nx=x/W; const y=H*0.91+Math.sin(nx*Math.PI*2*sw6.freq+T*sw6.spd*60+sw6.ph)*5;
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

      // Dry sand
      const dry=ctx.createLinearGradient(0,H*0.94,0,H);
      dry.addColorStop(0,'#e8dfc8'); dry.addColorStop(1,'#f0e9da');
      ctx.fillStyle=dry; ctx.fillRect(0,H*0.945,W,H*0.055+2);

      T++;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, [canvasRef]);
}

export default function Hero() {
  const canvasRef = useRef(null);
  useBeachCanvas(canvasRef);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="beach-canvas" />
      <div className="sun-shimmer" style={{width:'320px',height:'320px',top:'8%',right:'18%'}} />

      <div className="hero-content">
        <span className="hero-tag">Therapy &amp; Healing</span>
        <h1 className="hero-title">
          Find your calm<br />
          <em>beneath the waves</em>
        </h1>
        <p className="hero-sub">
          A safe, warm space where your emotions are met with curiosity — not judgment. Together, we navigate what lies beneath.
        </p>
        <div className="hero-btns">
          <a href="#contact" className="btn-p">Begin Your Journey</a>
          <a href="#about"   className="btn-s">Meet Athaang →</a>
        </div>
      </div>

      <div className="hero-illo">
        <svg width="380" height="420" viewBox="0 0 380 420" fill="none" className="float-anim" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="rg1" cx="50%" cy="40%"><stop offset="0%" stopColor="#dceee9"/><stop offset="100%" stopColor="#a8c5bc" stopOpacity="0"/></radialGradient>
            <radialGradient id="rg2" cx="40%" cy="35%"><stop offset="0%" stopColor="#cde6de"/><stop offset="100%" stopColor="#6b9e8f"/></radialGradient>
            <radialGradient id="rg3" cx="35%" cy="30%"><stop offset="0%" stopColor="#f0f7f5"/><stop offset="100%" stopColor="#b8d8d0"/></radialGradient>
            <filter id="sg"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <ellipse cx="190" cy="220" rx="162" ry="172" fill="url(#rg1)" opacity=".5"/>
          <path d="M190 58 C266 65 328 128 338 202 C348 276 302 348 232 368 C162 388 90 352 64 280 C38 208 74 128 136 92 C157 80 176 54 190 58Z" fill="url(#rg2)" opacity=".6"/>
          <path d="M190 82 C248 90 300 140 308 202 C316 264 282 326 222 342 C162 358 104 322 86 262 C68 202 98 138 148 108 C166 96 184 78 190 82Z" fill="url(#rg3)" opacity=".68"/>
          <circle cx="190" cy="210" r="90"  stroke="#6b9e8f" strokeWidth="1" strokeDasharray="6 5" fill="none" opacity=".22"/>
          <circle cx="190" cy="210" r="118" stroke="#a8c5bc" strokeWidth=".8" strokeDasharray="4 7" fill="none" opacity=".16"/>
          <ellipse cx="190" cy="196" rx="36" ry="50" fill="#d4eae4" opacity=".78"/>
          <ellipse cx="159" cy="215" rx="27" ry="37" fill="#c8e0d8" opacity=".58" transform="rotate(-32 159 215)"/>
          <ellipse cx="221" cy="215" rx="27" ry="37" fill="#c8e0d8" opacity=".58" transform="rotate(32 221 215)"/>
          <circle cx="190" cy="206" r="17" fill="#3d6b5e" opacity=".82" filter="url(#sg)"/>
          <circle cx="190" cy="206" r="9"  fill="#a8c5bc"/>
          <circle cx="186" cy="202" r="3.5" fill="white" opacity=".6"/>
          <text x="78"  y="114" fontSize="12" fill="#6b9e8f" opacity=".42">✦</text>
          <text x="288" y="136" fontSize="10" fill="#a8c5bc" opacity=".48">✦</text>
        </svg>
      </div>
    </section>
  );
}
